'use client'

import { AssignedEmergencyRequest, EmergencyRequest } from "@/types/EmergencyRequest"
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { EmergencyRequestPriorityQueue } from "../EmergencyRequestPriorityQueue";
import { useAuth } from "./AuthContext";

type EmergencyRequestContextType = {
    requests: EmergencyRequest[];
    assignedRequests: AssignedEmergencyRequest[];
    enqueueRequest: (request: EmergencyRequest) => void ;
    dequeueRequest: () => void;
    getRequestSize: () => number ;
    getAllRequests: () => void;
    updateRequest: (id: string, updatedFields: Partial<EmergencyRequest>) => boolean ;
    removeRequest: (id: string) => boolean ; 

    assignRequestToOfficer: (id:string) => AssignedEmergencyRequest | null;
}

const EmergencyRequestContext = createContext<EmergencyRequestContextType | undefined>(undefined);

export const EmergencyRequestProvider = ({ children }: { children: React.ReactNode }) => {
    const EmergencyRef = useRef(new EmergencyRequestPriorityQueue());
    
    const [requests, setRequests] = useState<EmergencyRequest[]>([]);
    const [assignedRequests, setAssignedRequests] = useState<AssignedEmergencyRequest[]>([]);

    const user = useAuth();
    
    useEffect(() => {
        const emergencyRequests = [
            {
              id: "REQ-1",
              title: "Armed Robbery",
              description: "Armed individuals reported inside a convenience store.",
              priority: 4,
              reportedTime: "2025-04-09T09:07:28.939872"
            },
            {
              id: "REQ-2",
              title: "Fire Outbreak",
              description: "Fire reported on the second floor of an apartment complex.",
              priority: 4,
              reportedTime: "2025-04-13T07:08:28.939872"
            },
            {
              id: "REQ-3",
              title: "Domestic Violence",
              description: "Loud altercation between neighbors escalating to violence.",
              priority: 5,
              reportedTime: "2025-04-28T10:31:28.939872"
            },
            {
              id: "REQ-4",
              title: "Road Accident",
              description: "Multiple vehicle collision on highway with injuries.",
              priority: 1,
              reportedTime: "2025-04-11T10:54:28.939872"
            },
            {
              id: "REQ-5",
              title: "Suspicious Activity",
              description: "Unidentified person seen loitering near school entrance.",
              priority: 3,
              reportedTime: "2025-04-08T14:47:28.939872"
            },
            {
              id: "REQ-6",
              title: "Medical Emergency",
              description: "Elderly person collapsed at a grocery store.",
              priority: 2,
              reportedTime: "2025-04-18T02:00:28.939872"
            },
            {
              id: "REQ-7",
              title: "Burglary in Progress",
              description: "Break-in reported at a residential property.",
              priority: 2,
              reportedTime: "2025-04-18T06:55:28.939872"
            },
            {
              id: "REQ-8",
              title: "Missing Person",
              description: "Child missing from local park for over 30 minutes.",
              priority: 1,
              reportedTime: "2025-04-10T09:36:28.939872"
            },
            {
              id: "REQ-9",
              title: "Vandalism Report",
              description: "Graffiti and property damage reported at train station.",
              priority: 3,
              reportedTime: "2025-04-24T14:13:28.939872"
            },
            {
              id: "REQ-10",
              title: "Drug Activity",
              description: "Suspicious individuals exchanging packages in alley.",
              priority: 3,
              reportedTime: "2025-04-05T11:51:28.939872"
            },
            {
              id: "REQ-11",
              title: "Public Disturbance",
              description: "Crowd blocking road in unauthorized protest.",
              priority: 5,
              reportedTime: "2025-04-15T08:34:28.939872"
            },
            {
              id: "REQ-12",
              title: "Stabbing Incident",
              description: "Person stabbed outside nightclub.",
              priority: 3,
              reportedTime: "2025-04-06T13:50:28.939872"
            },
            {
              id: "REQ-13",
              title: "Child Abduction",
              description: "Attempted child abduction reported at mall.",
              priority: 2,
              reportedTime: "2025-04-25T01:59:28.939872"
            },
            {
              id: "REQ-14",
              title: "Illegal Gathering",
              description: "Large group gathering in violation of curfew.",
              priority: 3,
              reportedTime: "2025-04-22T10:14:28.939872"
            },
            {
              id: "REQ-15",
              title: "Homicide Alert",
              description: "Gunshot heard in residential neighborhood.",
              priority: 3,
              reportedTime: "2025-04-08T06:22:28.939872"
            },
            {
              id: "REQ-16",
              title: "Cybercrime Tip",
              description: "Tip about online threats against government agency.",
              priority: 2,
              reportedTime: "2025-04-27T19:59:28.939872"
            },
            {
              id: "REQ-17",
              title: "Smuggling Report",
              description: "Truck suspected of carrying contraband spotted.",
              priority: 1,
              reportedTime: "2025-04-09T01:26:28.939872"
            },
            {
              id: "REQ-18",
              title: "Unattended Package",
              description: "Backpack left unattended in public square.",
              priority: 3,
              reportedTime: "2025-04-17T21:37:28.939872"
            },
            {
              id: "REQ-19",
              title: "Noise Complaint",
              description: "Neighbors report ongoing domestic violence incident.",
              priority: 3,
              reportedTime: "2025-04-28T22:39:28.939872"
            },
            {
              id: "REQ-20",
              title: "Trespassing",
              description: "Trespasser on private property refusing to leave.",
              priority: 4,
              reportedTime: "2025-04-07T13:56:28.939872"
            }
          ];

        emergencyRequests.forEach((request) => {
            try{
                EmergencyRef.current.enqueue(request as EmergencyRequest);
            }
            catch(e){
                console.log('Error Enqeueing data')
            }
        })

        setRequests(EmergencyRef.current.getAll());
    }, []);

    const enqueueRequest = (request: EmergencyRequest) => {
        try{
        EmergencyRef.current.enqueue(request);
        setRequests(EmergencyRef.current.getAll());
        }
        catch(e){
            console.log('Error enqueuing request');
        }
    }

    const dequeueRequest = () => {
      try {
          const req = EmergencyRef.current.dequeue();
          if (req) {
              const assignedreq: AssignedEmergencyRequest = {
                  request: req,
                  assignedOfficer: user.user?.id ?? "Unknown Officer",
                  assignedTime: new Date().toISOString(),
                  status: 'assigned',
                  resolvedTime: ''
              };
              
              setAssignedRequests(prev => {
                  const updated = [...prev, assignedreq];
                  return updated;
              });

              console.log(assignedRequests)
          } else {
              console.log('No request to dequeue');
          }
    
          setRequests(EmergencyRef.current.getAll());
          
      } catch (e) {
          console.log('Error dequeuing request:', e);
      }
    }
  

    const getRequestSize = () : number => {
        return EmergencyRef.current.size();
    }

    const getAllRequests = () => {
        setRequests(EmergencyRef.current.getAll());
    }

    const updateRequest = (id: string, updatedFields: Partial<EmergencyRequest>) : boolean => {
        try{
            EmergencyRef.current.updateRequest(id, updatedFields);
            setRequests(EmergencyRef.current.getAll());
            return true;
        }
        catch(e){
            console.log('Error updating request');
            return false;
        }
    }

   const removeRequest = (id: string) : boolean => {

        const success = EmergencyRef.current.removeById(id);

        if(success) {
            setRequests(EmergencyRef.current.getAll());
            return true;
        }
        else {
            return false;
        }
        
   }

   const assignRequestToOfficer = (officerId: string) => {
    try {
        const req = EmergencyRef.current.dequeue();
        if (req) {
            const assignedreq: AssignedEmergencyRequest = {
                request: req,
                assignedOfficer: officerId,
                assignedTime: new Date().toISOString(),
                status: 'assigned',
                resolvedTime: ''
            };
            
            setAssignedRequests(prev => [...prev, assignedreq]);
            setRequests(EmergencyRef.current.getAll());
            
            return assignedreq;
        }
        return null;
    } catch (e) {
        console.log('Error assigning request:', e);
        return null;
    }
  }


   return (
    <EmergencyRequestContext.Provider value={{ requests, assignedRequests, enqueueRequest, dequeueRequest, getRequestSize, getAllRequests, updateRequest, removeRequest, assignRequestToOfficer}}>
        { children }
    </EmergencyRequestContext.Provider>
   )

}

export const useEmergencyRequestContext = () => {
    const context = useContext(EmergencyRequestContext);

    if (!context) throw new Error("EmergencyRequestContext must be inside the EmergencyRequestProvider");

    return context;
}