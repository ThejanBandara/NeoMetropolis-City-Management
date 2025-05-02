'use client'

import { Criminal } from "@/types/Criminal"
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CriminalMap } from "../CriminalDataMap";

type CriminalContextType = {
    criminals: Criminal[];
    insertCriminal: (id: string, value: Criminal) => boolean;
    deleteCriminal: (id: string) => boolean;
    updateCriminal: (id: string, value: Criminal) => boolean;
    getAllCriminals: () => void;
    getCriminalsSize: () => number;
}

const CriminalContext = createContext<CriminalContextType | undefined>(undefined);

export const CriminalProvider = ({ children }: { children: React.ReactNode }) => {
    const CriminalRef = useRef(new CriminalMap());
    const [criminals, setCriminals] = useState<Criminal[]>([]);

    useEffect(() => {
        const sampleData: Criminal[] = [
            {
                id: 'CRM-1',
                name: 'John Wick',
                gender: 'male',
                crimeType: 'Assault',
                crimeDescription: 'Involved in multiple high-profile assassinations.',
                date: '2023-08-01',
                isrepeatOffender: true,
                status: 'convicted'
            },
            {
                id: 'CRM-2',
                name: 'Jane Doe',
                gender: 'female',
                crimeType: 'Fraud',
                crimeDescription: 'Embezzled millions from a corporation.',
                date: '2024-02-12',
                isrepeatOffender: false,
                status: 'in_court'
            },
            {
                id: 'CRM-3',
                name: 'Alex Unknown',
                gender: 'unknown',
                crimeType: 'Cyber Crime',
                crimeDescription: 'Hacked into government databases.',
                date: '2024-10-05',
                isrepeatOffender: true,
                status: 'under_investigation'
            },
            {
                id: 'CRM-4',
                name: 'Maria Gonzales',
                gender: 'female',
                crimeType: 'Drug Possession',
                crimeDescription: 'Caught with illegal substances in possession.',
                date: '2023-12-11',
                isrepeatOffender: false,
                status: 'released'
            },
            {
                id: 'CRM-5',
                name: 'David Smith',
                gender: 'male',
                crimeType: 'Theft',
                crimeDescription: 'Stole valuables from multiple homes.',
                date: '2023-11-19',
                isrepeatOffender: true,
                status: 'convicted'
            },
            {
                id: 'CRM-6',
                name: 'Lisa Turner',
                gender: 'female',
                crimeType: 'Kidnapping',
                crimeDescription: 'Abducted a high-profile businessman.',
                date: '2022-07-08',
                isrepeatOffender: false,
                status: 'in_court'
            },
            {
                id: 'CRM-7',
                name: 'Chris Brown',
                gender: 'male',
                crimeType: 'Murder',
                crimeDescription: 'Involved in a first-degree homicide case.',
                date: '2024-01-01',
                isrepeatOffender: true,
                status: 'convicted'
            },
            {
                id: 'CRM-8',
                name: 'Nina Patel',
                gender: 'female',
                crimeType: 'Smuggling',
                crimeDescription: 'Transported illegal goods across borders.',
                date: '2024-03-14',
                isrepeatOffender: false,
                status: 'under_investigation'
            },
            {
                id: 'CRM-9',
                name: 'Maxwell Payne',
                gender: 'male',
                crimeType: 'Assault',
                crimeDescription: 'Engaged in violent altercation with law enforcement.',
                date: '2023-09-09',
                isrepeatOffender: true,
                status: 'convicted'
            },
            {
                id: 'CRM-10',
                name: 'Emily Rose',
                gender: 'female',
                crimeType: 'Arson',
                crimeDescription: 'Set fire to a government building.',
                date: '2023-06-03',
                isrepeatOffender: false,
                status: 'in_court'
            },
            {
                id: 'CRM-11',
                name: 'Robert King',
                gender: 'male',
                crimeType: 'Tax Evasion',
                crimeDescription: 'Did not report earnings for 5 years.',
                date: '2022-04-15',
                isrepeatOffender: true,
                status: 'under_investigation'
            },
            {
                id: 'CRM-12',
                name: 'Isabella Clark',
                gender: 'female',
                crimeType: 'Identity Theft',
                crimeDescription: 'Stole and used multiple fake identities.',
                date: '2024-01-22',
                isrepeatOffender: false,
                status: 'convicted'
            },
            {
                id: 'CRM-13',
                name: 'Tyler Grant',
                gender: 'male',
                crimeType: 'Extortion',
                crimeDescription: 'Blackmailed officials for personal gain.',
                date: '2023-05-25',
                isrepeatOffender: true,
                status: 'in_court'
            },
            {
                id: 'CRM-14',
                name: 'Angela White',
                gender: 'female',
                crimeType: 'Bribery',
                crimeDescription: 'Bribed judges to avoid prosecution.',
                date: '2024-02-07',
                isrepeatOffender: true,
                status: 'under_investigation'
            },
            {
                id: 'CRM-15',
                name: 'Samuel Black',
                gender: 'male',
                crimeType: 'Vandalism',
                crimeDescription: 'Destroyed public property.',
                date: '2023-03-12',
                isrepeatOffender: false,
                status: 'released'
            },
            {
                id: 'CRM-16',
                name: 'Olivia Green',
                gender: 'female',
                crimeType: 'Forgery',
                crimeDescription: 'Created fake documents for immigration.',
                date: '2023-10-16',
                isrepeatOffender: true,
                status: 'convicted'
            },
            {
                id: 'CRM-17',
                name: 'Noah Johnson',
                gender: 'male',
                crimeType: 'Pickpocketing',
                crimeDescription: 'Stole wallets in a crowded subway.',
                date: '2024-03-01',
                isrepeatOffender: false,
                status: 'released'
            },
            {
                id: 'CRM-18',
                name: 'Samantha Lee',
                gender: 'female',
                crimeType: 'Hacking',
                crimeDescription: 'Breached security of a tech company.',
                date: '2023-12-24',
                isrepeatOffender: false,
                status: 'in_court'
            },
            {
                id: 'CRM-19',
                name: 'Liam Walker',
                gender: 'male',
                crimeType: 'Counterfeiting',
                crimeDescription: 'Printed and distributed fake currency.',
                date: '2022-11-30',
                isrepeatOffender: true,
                status: 'convicted'
            },
            {
                id: 'CRM-20',
                name: 'Avery Brooks',
                gender: 'other',
                crimeType: 'Burglary',
                crimeDescription: 'Broke into a jewelry store at night.',
                date: '2024-04-10',
                isrepeatOffender: false,
                status: 'under_investigation'
            }
        ];

        sampleData.forEach((criminal) => {
            try {
                CriminalRef.current.insertCriminal(criminal.id, criminal);
            } catch (e) {
                console.warn(`${criminal.name} already exists.`);
            }
        });

        setCriminals(CriminalRef.current.getAllCriminals());
    }, []);

    const insertCriminal = (id: string, value: Criminal): boolean => {
        try {
            CriminalRef.current.insertCriminal(id, value);
            setCriminals(CriminalRef.current.getAllCriminals());
            return true;
        }
        catch (e) {
            return false;
        }
    }

    const deleteCriminal = (id: string): boolean => {
        try {
            CriminalRef.current.deleteCriminal(id);
            setCriminals(CriminalRef.current.getAllCriminals());
            return true;
        }
        catch (e) {
            return false;
        }
    }

    const updateCriminal = (id: string, value: Criminal) => {
        try {
            CriminalRef.current.updateCriminal(id, value);
            setCriminals(CriminalRef.current.getAllCriminals());
            return true;
        }
        catch (e) {
            return false;
        }
    }

    const getAllCriminals = () => {
        setCriminals(CriminalRef.current.getAllCriminals());
    }

    const getCriminalsSize = () => {
        return CriminalRef.current.getCriminalSize();
    }

    return (
        <CriminalContext.Provider value={{ criminals, insertCriminal, deleteCriminal, updateCriminal, getAllCriminals, getCriminalsSize }}>
            {children}
        </CriminalContext.Provider>
    );
}

export const useCriminalContext = () => {
    const context = useContext(CriminalContext);

    if (!context) throw new Error("CriminalContext must be inside a CriminalProvider");

    return context;
}