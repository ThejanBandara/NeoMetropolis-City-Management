import { Stack } from '@/lib/utils/Stack'
import { TrafficSignal } from '@/types/TrafficSignal'
import React, { useEffect, useRef, useState } from 'react'

const TrafficSignalManager = () => {

    const createInitialSignals = (): TrafficSignal[] => [
        { id: 'ew', name: 'east-west', Direction: 'EW', timing: 30, state: "green", undoStack: new Stack(), redoStack: new Stack() },
        { id: 'we', name: 'west-east', Direction: 'WE', timing: 30, state: "red", undoStack: new Stack(), redoStack: new Stack() },
        { id: 'n', name: 'north', Direction: 'N', timing: 30, state: "red", undoStack: new Stack(), redoStack: new Stack() },
    ]

    const [signals, setSignals] = useState<TrafficSignal[]>(createInitialSignals);
    const [TrafficLight1, setTrafficLight1] = useState<number>(signals[0].timing);
    const [TrafficLight2, setTrafficLight2] = useState<number>(signals[1].timing);
    const [TrafficLight3, setTrafficLight3] = useState<number>(signals[2].timing);

    const currentIndexRef = useRef(0);
    const [countdown, setCountdown] = useState<number>(signals[0].timing);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isYellowPhaseRef = useRef(false);

    const HandleTiming = (index: number, value: number) => {
        var val = signals[index];

        if (val.timing === value) {
            return;
        }
        else if (value === null || undefined || 0) {
            return;
        }

        val.undoStack.push(val.timing);
        val.redoStack.clear();
        val.timing = value;
        setSignals(prevSignals => {
            const updatedSignals = [...prevSignals];
            updatedSignals[index] = val;
            return updatedSignals;
        });
        console.log(signals)
    }

    const handleUndo = (index: number) => {
        var val = signals[index];
        if (val.undoStack.isEmpty()) {
            return;
        }
        val.redoStack.push(val.timing);
        val.timing = val.undoStack.pop()!;
        setSignals(prevSignals => {
            const updatedSignals = [...prevSignals];
            updatedSignals[index] = val;
            return updatedSignals;
        });
        if (index === 0) {
            setTrafficLight1(val.timing);
        }
        else if (index === 1) {
            setTrafficLight2(val.timing);
        }
        else if (index === 2) {
            setTrafficLight3(val.timing);
        }
    }

    const handleRedo = (index: number) => {
        var val = signals[index];
        if (val.redoStack.isEmpty()) {
            return;
        }
        val.undoStack.push(val.timing);
        val.timing = val.redoStack.pop()!;
        setSignals(prevSignals => {
            const updatedSignals = [...prevSignals];
            updatedSignals[index] = val;
            return updatedSignals;
        });

        if (index === 0) {
            setTrafficLight1(val.timing);
        }
        else if (index === 1) {
            setTrafficLight2(val.timing);
        }
        else if (index === 2) {
            setTrafficLight3(val.timing);
        }
    }

    useEffect(() => {
        const tick = () => {
            setCountdown(prev => prev - 1);
        };
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(tick, 1000);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            const updated = signals.map(signal => ({ ...signal }));
            let nextCountdown = 0;

            if (!isYellowPhaseRef.current) {
                const current = updated[currentIndexRef.current];
                const nextIndex = (currentIndexRef.current + 1) % updated.length;

                updated.forEach(sig => (sig.state = "red"));
                current.state = "yellow";
                updated[nextIndex].state = "yellow";

                isYellowPhaseRef.current = true;
                nextCountdown = 3; // Yellow phase duration
            } else {
                const nextIndex = (currentIndexRef.current + 1) % updated.length;

                updated.forEach(sig => (sig.state = "red"));
                updated[nextIndex].state = "green";

                currentIndexRef.current = nextIndex;
                isYellowPhaseRef.current = false;
                nextCountdown = updated[nextIndex].timing;
            }

            setSignals(updated);
            setCountdown(nextCountdown); // set after signals update
        }
    }, [countdown]);




    return (
        <div className='w-full h-full p-2'>
            <h1 className='text-2xl font-medium py-4 lg:py-2 w-full flex flex-col items-center justify-center lg:items-start'>Traffic Signal AI</h1>
            <div className='w-full h-[85vh] mt-4 lg:mt-0 flex flex-col items-stretch'>
                <div className='w-full h-full flex flex-row gap-2 items-center justify-evenly'>

                    <div className='w-full h-full p-2 bg-base-300 rounded-lg realtive flex flex-col items-center justify-between gap-2'>
                        <div>
                            <h1 className='text-xl font-semibold'>Traffic Light 1</h1>
                            <p className='text-sm text-gray-500 text-center'>{signals[0].name}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-3 bg-gray-800 px-3 py-4 rounded-lg relative' >
                            <p className={`size-15 text-sm flex flex-col items-center justify-center rounded-full font-medium shadow-lg ${signals[0].state === 'red' ? 'bg-error/50 shadow-error/50' : 'bg-gray-900/50'}`}></p>
                            <p className={`size-15 text-sm flex flex-col items-center justify-center rounded-full font-medium shadow-lg ${signals[0].state === 'yellow' ? 'bg-warning/50 shadow-warning/50' : 'bg-gray-900/50'}`}></p>
                            <p className={`size-15 text-sm flex flex-col items-center justify-center rounded-full font-medium shadow-lg ${signals[0].state === 'green' ? 'bg-success/50 shadow-success/50' : 'bg-gray-900/50'}`}></p>
                            <div className='absolute h-12 w-6 bg-gray-800 -bottom-12'></div>
                            <p className={`absolute -top-12 text-xl font-semibold ${signals[0].state === 'green'? 'text-success' : signals[0].state === 'yellow' ? 'text-warning' : 'text-base-300'}`}>{countdown}</p>
                        </div>
                        <div className='w-full h-fit flex flex-col items-strech gap-2'>
                            <div className='w-full flex flex-row gap-2 items-center justify-center p-1'>
                                <input type="number" className='input w-1/4' value={TrafficLight1} onChange={(e) => { if (e.target.valueAsNumber === null || undefined) { return }; setTrafficLight1(e.target.valueAsNumber) }} />
                                <button className='btn btn-soft btn-info' onClick={() => HandleTiming(0, TrafficLight1)}>set</button>
                            </div>
                            <div className='w-full flex flex-row items-center justify-center gap-2 p-1'>
                                <button className='btn btn-soft btn-warning' onClick={() => handleUndo(0)}>undo</button>
                                <button className='btn btn-soft btn-success' onClick={() => handleRedo(0)}>redo</button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-full p-2 bg-base-300 rounded-lg realtive flex flex-col items-center justify-between gap-2'>
                        <div>
                            <h1 className='text-xl font-semibold'>Traffic Light 2</h1>
                            <p className='text-sm text-gray-500 text-center'>{signals[1].name}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-3 bg-gray-800 px-3 py-4 rounded-lg relative' >
                            <p className={`size-15 text-sm flex flex-col items-center justify-center rounded-full font-medium shadow-lg ${signals[1].state === 'red' ? 'bg-error/50 shadow-error/50' : 'bg-gray-900/50'}`}></p>
                            <p className={`size-15 text-sm flex flex-col items-center justify-center rounded-full font-medium shadow-lg ${signals[1].state === 'yellow' ? 'bg-warning/50 shadow-warning/50' : 'bg-gray-900/50'}`}></p>
                            <p className={`size-15 text-sm flex flex-col items-center justify-center rounded-full font-medium shadow-lg ${signals[1].state === 'green' ? 'bg-success/50 shadow-success/50' : 'bg-gray-900/50'}`}></p>
                            <div className='absolute h-12 w-6 bg-gray-800 -bottom-12'></div>
                            <p className={`absolute -top-12 text-xl font-semibold ${signals[1].state === 'green'? 'text-success' : signals[1].state === 'yellow' ? 'text-warning' : 'text-base-300'}`}>{countdown}</p>
                        </div>
                        <div className='w-full h-fit flex flex-col items-strech gap-2'>
                            <div className='w-full flex flex-row gap-2 items-center justify-center p-1'>
                                <input type="number" className='input w-1/4' value={TrafficLight2} onChange={(e) => { if (e.target.valueAsNumber === null || undefined) { return }; setTrafficLight2(e.target.valueAsNumber) }} />
                                <button className='btn btn-soft btn-info' onClick={() => HandleTiming(1, TrafficLight2)}>set</button>
                            </div>
                            <div className='w-full flex flex-row items-center justify-center gap-2 p-1'>
                                <button className='btn btn-soft btn-warning' onClick={() => handleUndo(1)}>undo</button>
                                <button className='btn btn-soft btn-success' onClick={() => handleRedo(1)}>redo</button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-full p-2 bg-base-300 rounded-lg realtive flex flex-col items-center justify-between gap-2'>
                        <div>
                            <h1 className='text-xl font-semibold'>Traffic Light 3</h1>
                            <p className='text-sm text-gray-500 text-center'>{signals[2].name}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-3 bg-gray-800 px-3 py-4 rounded-lg relative' >
                            <p className={`size-15 text-sm flex flex-col items-center justify-center rounded-full font-medium shadow-lg ${signals[2].state === 'red' ? 'bg-error/50 shadow-error/50' : 'bg-gray-900/50'}`}></p>
                            <p className={`size-15 text-sm flex flex-col items-center justify-center rounded-full font-medium shadow-lg ${signals[2].state === 'yellow' ? 'bg-warning/50 shadow-warning/50' : 'bg-gray-900/50'}`}></p>
                            <p className={`size-15 text-sm flex flex-col items-center justify-center rounded-full font-medium shadow-lg ${signals[2].state === 'green' ? 'bg-success/50 shadow-success/50' : 'bg-gray-900/50'}`}></p>
                            <div className='absolute h-12 w-6 bg-gray-800 -bottom-12'></div>
                            <p className={`absolute -top-12 text-xl font-semibold ${signals[2].state === 'green'? 'text-success' : signals[2].state === 'yellow' ? 'text-warning' : 'text-base-300'}`}>{countdown}</p>
                        </div>
                        <div className='w-full h-fit flex flex-col items-strech gap-2'>
                            <div className='w-full flex flex-row gap-2 items-center justify-center p-1'>
                                <input type="number" className='input w-1/4' value={TrafficLight3} onChange={(e) => { if (e.target.valueAsNumber === null || undefined) { return }; setTrafficLight3(e.target.valueAsNumber) }} />
                                <button className='btn btn-soft btn-info' onClick={() => HandleTiming(2, TrafficLight3)}>set</button>
                            </div>
                            <div className='w-full flex flex-row items-center justify-center gap-2 p-1'>
                                <button className='btn btn-soft btn-warning' onClick={() => handleUndo(2)}>undo</button>
                                <button className='btn btn-soft btn-success' onClick={() => handleRedo(2)}>redo</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default TrafficSignalManager