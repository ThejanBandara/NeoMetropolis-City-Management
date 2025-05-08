'use client'
import { useAuth } from '@/lib/context/AuthContext'
import { useEmergencyRequestContext } from '@/lib/context/EmergencyRequestContext';
import { useTabControl } from '@/lib/context/TabControlContext';
import formatDate from '@/lib/utils/FormatDate';
import { AssignedEmergencyRequest } from '@/types/EmergencyRequest';
import { CctvIcon, FileStackIcon, ListChecks, ListChecksIcon, Siren, SunIcon, TrafficConeIcon, UsersIcon, Waves, Wind } from 'lucide-react';
import React, { use, useEffect, useState } from 'react'

const Dashboard = () => {


  const user = useAuth();
  const tab = useTabControl();
  const Emergency = useEmergencyRequestContext();
  const [available, setAvailable] = useState<boolean | undefined>(user.user?.isAvailable);
  const [assignedRequest, setAssignedRequest] = useState<AssignedEmergencyRequest>();
  const [isAssigning, setIsAssigning] = useState(true);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isAssigning && Emergency.assignedRequests.length > 0) {
      const index = Emergency.assignedRequests.findIndex(req => req.assignedOfficer === user.user?.id && req.status === 'assigned');
      if (index !== -1) {
        setAssignedRequest(Emergency.assignedRequests[index]);
        setIsAssigning(false);
        console.log(assignedRequest);
      }
    }
  }, [Emergency.assignedRequests, isAssigning, user.user?.id]);


  const handleAssignTask = () => {
    const newRequest = user.user?.id ? Emergency.assignRequestToOfficer(user.user.id) : null;
    if (newRequest) {
      setAssignedRequest(newRequest);
    }
  }

  const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const handleResolveTask = async () => {
    Emergency.resolveRequest(assignedRequest?.request.id || '');
    setIsComplete(true);

    await delay(1000);

    user.updateAvailability(!available);
    setAvailable(user.user?.isAvailable)
    setIsComplete(false)
  }

  return (
    <div className='w-full h-full p-2 max-h-screen '>
      <h1 className='text-2xl font-medium py-4 lg:py-2 w-full flex flex-col items-center justify-center lg:items-start'>Dashboard</h1>
      <div className='w-full h-[85vh] mt-4 lg:mt-0 lg:h-[90vh] flex flex-row gap-2 items-strech'>

        <div className='w-2/3 h-full'>
          <div className='w-full h-1/4 bg-base-200 rounded-lg p-2 relative'>
            <p className='text-lg'>hi, Officer {user.user?.name}</p>
            <p className='text-2xl font-medium'>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className='flex flex-row gap-3 items-center pt-2'>
              <div className='flex flex-col items-center'>
                <p className='text-4xl font-bold' >24°C</p>
                <p className='text-sm font-light'>feels like: 22°C</p>
              </div>
              <div className='flex flex-col items-center '>
                <SunIcon className='text-yellow-500 size-10'/>
                <p>sunny</p>
              </div>
              <div>
                <div>
                  <Wind className='size-4'/>
                  <p className='text-xs font-extralight'>2km/h</p>
                </div>
                <div>
                  <Waves className='size-4'/>
                  <p className='text-xs font-extralight'>41%</p>
                </div>
              </div>
            </div>
            <div className={`absolute top-0 right-0 mt-2 mr-2 flex flex-row gap-2 items-center border-[1px] px-2 rounded-full ${available ? 'border-green-500' : 'border-red-500'}`}>
              <div className={`size-2 rounded-full ${available ? 'bg-green-500' : 'bg-red-500'} animate-ping`}></div>
              <p className='text-sm text-gray-400'>{available ? "Available" : "Not Available"}</p>
            </div>
          </div>
          <h1 className='font-medium text-lg'>Quick access</h1>
          <div className='w-6/6 h-1/3 grid grid-rows-2 grid-cols-3 gap-3 p-2'>
            <button className='btn btn-soft btn-primary h-6/6 rounded-lg w-auto' onClick={() => {tab.setTab(2)}}><UsersIcon className='size-8' /> <span className='grow text-center'>Citizen management</span></button>
            <button className='btn btn-soft btn-secondary h-6/6 rounded-lg w-auto' onClick={() => {tab.setTab(3)}}><CctvIcon className='size-8' /> <span className='grow text-center'>Criminal Records</span></button>
            <button className='btn btn-soft btn-accent h-6/6 rounded-lg grow w-auto' onClick={() => {tab.setTab(4)}}><Siren className='size-8' /> <span className='grow text-center'>Emergency Requests</span></button>
            <button className='btn btn-soft btn-info h-6/6 rounded-lg w-auto' onClick={() => {tab.setTab(7)}}><ListChecks className='size-8' /> <span className='grow text-center'>Request tracking</span></button>
            <button className='btn btn-soft btn-warning h-6/6 rounded-lg w-auto' onClick={() => {tab.setTab(5)}}><FileStackIcon className='size-8' /> <span className='grow text-center'>Reports</span> </button>
            <button className='btn btn-soft btn-error h-6/6 rounded-lg w-auto' onClick={() => {tab.setTab(6)}}><TrafficConeIcon className='size-8' /> <span className='grow text-center'>Traffic AI</span></button>
          </div>
        </div>

        <div className='w-1/3 h-full bg-base-200 rounded-lg p-2'>
          {
            available ? (
              <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                <ListChecksIcon className='text-gray-500 size-12' />
                <p className='text-gray-500 text-xl font-medium text-center w-8/12'>No Emergency Requests Assigned at the moment</p>
                <button className='btn btn-soft btn-info btn-wide' onClick={() => { user.updateAvailability(false); setAvailable(user.user?.isAvailable); handleAssignTask() }}>Assign a task</button>
              </div>
            ) :
              (
                <div className='w-full h-full flex flex-col items-center justify-between py-2'>
                  <h1 className='text-lg font-medium text-center'>Current Request Progress</h1>
                  <div className='w-full grow flex flex-col gap-2 items-center justify-center'>
                    <div className='bg-base-100 px-2 py-2 rounded-lg'>
                      <p className='font-medium'>{assignedRequest?.request.title}</p>
                      <p className='text-sm text-gray-400'>{assignedRequest?.request.description}</p>
                    </div>
                    <ul className="steps steps-vertical w-full px-4 h-4/6">
                      <li className="step step-success" data-content=''>
                        <div className='w-full'>
                          <p className='w-full text-left text-lg font-medium text-neutral-content'>Request Recieved</p>
                          <p className='w-full text-left text-sm text-gray-400'>{formatDate(assignedRequest?.request.reportedTime || '')}</p>
                        </div>
                      </li>
                      <li className="step step-success" data-content=''>
                        <div className='w-full'>
                          <p className='w-full text-left text-lg font-medium text-neutral-content'>Request assigned</p>
                          <p className='w-full text-left text-sm text-gray-400'>{formatDate(assignedRequest?.assignedTime || '')}</p>
                        </div>
                      </li>
                      <li className="step step-success" data-content=''>
                        <div className='w-full flex flex-col itmes-start'>
                          <p className='w-full text-left text-lg font-medium text-neutral-content text-nowrap'>Request under investigation</p>
                          <p className={`badge badge-soft badge-sm badge-info rounded-full border-[1px] border-info ${isComplete ? 'hidden' : ''}`}>Current Step</p>
                        </div>
                      </li>
                      <li className={`step ${isComplete ? 'step-success' : ''}`} data-content=''>
                        <div className='w-full flex flex-col items-start'>
                          <p className={`w-full text-left text-lg font-medium ${isComplete ? 'text-neutral-content' : 'text-gray-600'}`}>Request resolved</p>
                          {
                            isComplete ?
                              (
                                <p className='w-full text-left text-sm text-gray-400'>{formatDate(assignedRequest?.resolvedTime || '')}</p>
                              ) : (
                                <p className='badge badge-soft badge-sm text-gray-600 border-[1px] border-gray-500'>not yet completed</p>
                              )
                          }
                        </div>
                      </li>
                    </ul>
                  </div>
                  <button className={`btn btn-success btn-wide ${isComplete ? 'btn-disabled' : 'btn-soft'}`} onClick={() => { handleResolveTask()}}>Mark as Resolved</button>
                </div>
              )
          }
        </div>
      </div>

    </div>
  )
}

export default Dashboard