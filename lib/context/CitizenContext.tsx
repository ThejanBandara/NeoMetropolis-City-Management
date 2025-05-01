'use client'

import { Citizen } from "@/types/CitizenType"
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CitizenMap } from "../CitizenManagementHashMap";


type CitizenContextType = {
    citizens: Citizen[];
    insertCitizen: (citizen: Citizen) => boolean;
    deleteCitizen: (nic: string) => boolean;
    updateCitizen: (nic: string, citizen: Citizen) => boolean;
    getAllCitizen: () => void;
}

const CitizenContext = createContext<CitizenContextType | undefined>(undefined);

export const CitizenProvider = ({children}: {children: React.ReactNode}) => {
    const CitizenRef = useRef(new CitizenMap());
    const [citizens, setCitizens] = useState<Citizen[]>([]);

    useEffect(() => {
      const sampleCitizens: Citizen[] = [
        { nic: '991234567V', name: 'Nimal Perera', dateOfBirth: '1999-04-23', address: '123 Galle Road, Colombo' },
        { nic: '880987654V', name: 'Sunil Fernando', dateOfBirth: '1988-07-15', address: '56 Kandy Road, Kandy' },
        { nic: '950234567V', name: 'Kamal Rajapaksha', dateOfBirth: '1995-11-02', address: '78 Main Street, Matara' },
        { nic: '930123456V', name: 'Nadeesha Silva', dateOfBirth: '1993-03-14', address: '89 Lake Road, Negombo' },
        { nic: '981234567V', name: 'Chathura Jayasena', dateOfBirth: '1998-12-25', address: '45 Temple Street, Kurunegala' },
        { nic: '900345678V', name: 'Harsha Dissanayake', dateOfBirth: '1990-06-18', address: '90 Hill Street, Nuwara Eliya' },
        { nic: '970456789V', name: 'Sanduni Rathnayake', dateOfBirth: '1997-08-30', address: '12 River Lane, Anuradhapura' },
        { nic: '940987123V', name: 'Tharindu Gunasekara', dateOfBirth: '1994-02-10', address: '77 Palm Avenue, Gampaha' },
        { nic: '920123456V', name: 'Dilani Wickramasinghe', dateOfBirth: '1992-05-12', address: '33 Ocean Drive, Trincomalee' },
        { nic: '910234567V', name: 'Amila Abeysekara', dateOfBirth: '1991-10-19', address: '23 Forest Lane, Hambantota' },
        { nic: '960345678V', name: 'Isuru Weerasinghe', dateOfBirth: '1996-01-05', address: '67 City Road, Jaffna' },
        { nic: '870456789V', name: 'Nirosha Senanayake', dateOfBirth: '1987-09-25', address: '18 Queen Street, Badulla' },
        { nic: '850567890V', name: 'Ravindu Tennakoon', dateOfBirth: '1985-04-10', address: '102 Market Lane, Ratnapura' },
        { nic: '891234567V', name: 'Lakmali Herath', dateOfBirth: '1989-12-01', address: '19 School Road, Polonnaruwa' },
        { nic: '930678912V', name: 'Suresh Samarasinghe', dateOfBirth: '1993-03-30', address: '84 College Street, Kalutara' },
        { nic: '901234567V', name: 'Ruwan Madushanka', dateOfBirth: '1990-07-09', address: '120 Station Road, Monaragala' },
        { nic: '950456789V', name: 'Thilini Jayawardena', dateOfBirth: '1995-08-22', address: '55 Main Road, Batticaloa' },
        { nic: '980567890V', name: 'Ashen Peris', dateOfBirth: '1998-11-17', address: '88 Temple Path, Panadura' },
        { nic: '920678901V', name: 'Janaka Alwis', dateOfBirth: '1992-06-06', address: '60 New Town, Chilaw' },
        { nic: '860789012V', name: 'Sajani Kumari', dateOfBirth: '1986-02-28', address: '140 Hill Top, Galle' },
      ];
     
    
      for (const citizen of sampleCitizens) {
        try {
          CitizenRef.current.insertCitizen(citizen.nic, citizen);
        } catch (e) {
          console.error(`Citizen with NIC ${citizen.nic} already exists.`);
        }
      }
      setCitizens(CitizenRef.current.getAllCitizen())
    }, []);

    const insertCitizen = (citizen: Citizen): boolean => {
        try{
            CitizenRef.current.insertCitizen(citizen.nic, citizen);
            setCitizens(CitizenRef.current.getAllCitizen());
            return true;
        }
        catch (e){
            return false;
        }
    }

    const deleteCitizen = (nic: string): boolean => {
        try{

            CitizenRef.current.deleteCitizen(nic);
            setCitizens(CitizenRef.current.getAllCitizen());
            return true;
        }
        catch(e){
            return false;
        }
      };
    
      const updateCitizen = (nic:string, citizen: Citizen): boolean => {
        try{
            CitizenRef.current.updateCitizen(nic, citizen);
            setCitizens(CitizenRef.current.getAllCitizen());
            return true;
        }
        catch(e){
            return false;
        }
      }

      const getAllCitizen = () => {
        setCitizens(CitizenRef.current.getAllCitizen());
      }
    
    return(
        <CitizenContext.Provider value={{citizens, insertCitizen, deleteCitizen, updateCitizen, getAllCitizen}}>
            {children}
        </CitizenContext.Provider>
    )
}

export const useCitizenContext = () => {
    const context = useContext(CitizenContext);

    if (!context) throw new Error("useCitizenContext must be used within a CitizenProvider");

    return context;
}