'use client'

import { AssignedEmergencyRequest, EmergencyRequest } from "@/types/EmergencyRequest"
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { EmergencyRequestPriorityQueue } from "../EmergencyRequestPriorityQueue";
import { useAuth } from "./AuthContext";
import { assignedRequestsArray } from "../assignedRequests";
import { mergeSort } from "../sort/mergeSort";
import { insertionSort } from "../sort/insertionSort";

type EmergencyRequestContextType = {
  requests: EmergencyRequest[];
  assignedRequests: AssignedEmergencyRequest[];
  enqueueRequest: (request: EmergencyRequest) => void;
  dequeueRequest: () => void;
  getRequestSize: () => number;
  getAllRequests: () => void;
  updateRequest: (id: string, updatedFields: Partial<EmergencyRequest>) => boolean;
  removeRequest: (id: string) => boolean;

  assignRequestToOfficer: (id: string) => AssignedEmergencyRequest | null;
  resolveRequest: (index: string) => void;
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
        "id": "REQ-11",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T01:51:00"
      },
      {
        "id": "REQ-12",
        "title": "Burglary",
        "description": "Suspected break-in reported.",
        "priority": 1,
        "reportedTime": "2025-05-06T01:28:00"
      },
      {
        "id": "REQ-13",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 2,
        "reportedTime": "2025-05-06T02:11:00"
      },
      {
        "id": "REQ-14",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T02:58:00"
      },
      {
        "id": "REQ-15",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T02:49:00"
      },
      {
        "id": "REQ-16",
        "title": "Burglary",
        "description": "Suspected break-in reported.",
        "priority": 1,
        "reportedTime": "2025-05-06T03:11:00"
      },
      {
        "id": "REQ-17",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T03:24:00"
      },
      {
        "id": "REQ-18",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 5,
        "reportedTime": "2025-05-06T03:41:00"
      },
      {
        "id": "REQ-19",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 3,
        "reportedTime": "2025-05-06T03:25:00"
      },
      {
        "id": "REQ-20",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 4,
        "reportedTime": "2025-05-06T03:38:00"
      },
      {
        "id": "REQ-21",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 4,
        "reportedTime": "2025-05-06T03:39:00"
      },
      {
        "id": "REQ-22",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 3,
        "reportedTime": "2025-05-06T03:39:00"
      },
      {
        "id": "REQ-23",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 5,
        "reportedTime": "2025-05-06T03:26:00"
      },
      {
        "id": "REQ-24",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 4,
        "reportedTime": "2025-05-06T03:25:00"
      },
      {
        "id": "REQ-25",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 5,
        "reportedTime": "2025-05-06T03:09:00"
      },
      {
        "id": "REQ-26",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T04:23:00"
      },
      {
        "id": "REQ-27",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 4,
        "reportedTime": "2025-05-06T04:19:00"
      },
      {
        "id": "REQ-28",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 4,
        "reportedTime": "2025-05-06T04:11:00"
      },
      {
        "id": "REQ-29",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 4,
        "reportedTime": "2025-05-06T04:32:00"
      },
      {
        "id": "REQ-30",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 4,
        "reportedTime": "2025-05-06T04:27:00"
      },
      {
        "id": "REQ-31",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T04:44:00"
      },
      {
        "id": "REQ-32",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 4,
        "reportedTime": "2025-05-06T04:05:00"
      },
      {
        "id": "REQ-33",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 3,
        "reportedTime": "2025-05-06T04:42:00"
      },
      {
        "id": "REQ-34",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 2,
        "reportedTime": "2025-05-06T05:40:00"
      },
      {
        "id": "REQ-35",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 5,
        "reportedTime": "2025-05-06T05:20:00"
      },
      {
        "id": "REQ-36",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T05:55:00"
      },
      {
        "id": "REQ-37",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 3,
        "reportedTime": "2025-05-06T05:31:00"
      },
      {
        "id": "REQ-38",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 5,
        "reportedTime": "2025-05-06T05:05:00"
      },
      {
        "id": "REQ-39",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 5,
        "reportedTime": "2025-05-06T05:57:00"
      },
      {
        "id": "REQ-40",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T05:10:00"
      },
      {
        "id": "REQ-41",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 5,
        "reportedTime": "2025-05-06T05:33:00"
      },
      {
        "id": "REQ-42",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 3,
        "reportedTime": "2025-05-06T05:01:00"
      },
      {
        "id": "REQ-43",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 3,
        "reportedTime": "2025-05-06T05:03:00"
      },
      {
        "id": "REQ-44",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 3,
        "reportedTime": "2025-05-06T06:27:00"
      },
      {
        "id": "REQ-45",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T06:52:00"
      },
      {
        "id": "REQ-46",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 5,
        "reportedTime": "2025-05-06T06:56:00"
      },
      {
        "id": "REQ-47",
        "title": "Burglary",
        "description": "Suspected break-in reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T06:37:00"
      },
      {
        "id": "REQ-48",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 2,
        "reportedTime": "2025-05-06T06:37:00"
      },
      {
        "id": "REQ-49",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 5,
        "reportedTime": "2025-05-06T07:13:00"
      },
      {
        "id": "REQ-50",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 3,
        "reportedTime": "2025-05-06T07:46:00"
      },
      {
        "id": "REQ-51",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T07:08:00"
      },
      {
        "id": "REQ-52",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 5,
        "reportedTime": "2025-05-06T07:34:00"
      },
      {
        "id": "REQ-53",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T08:37:00"
      },
      {
        "id": "REQ-54",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T08:36:00"
      },
      {
        "id": "REQ-55",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T08:08:00"
      },
      {
        "id": "REQ-56",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 3,
        "reportedTime": "2025-05-06T08:00:00"
      },
      {
        "id": "REQ-57",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T08:35:00"
      },
      {
        "id": "REQ-58",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 5,
        "reportedTime": "2025-05-06T08:02:00"
      },
      {
        "id": "REQ-59",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 3,
        "reportedTime": "2025-05-06T08:27:00"
      },
      {
        "id": "REQ-60",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 3,
        "reportedTime": "2025-05-06T08:31:00"
      },
      {
        "id": "REQ-61",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T09:07:00"
      },
      {
        "id": "REQ-62",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 2,
        "reportedTime": "2025-05-06T09:29:00"
      },
      {
        "id": "REQ-63",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 4,
        "reportedTime": "2025-05-06T09:00:00"
      },
      {
        "id": "REQ-64",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T09:45:00"
      },
      {
        "id": "REQ-65",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 4,
        "reportedTime": "2025-05-06T09:42:00"
      },
      {
        "id": "REQ-66",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 1,
        "reportedTime": "2025-05-06T09:15:00"
      },
      {
        "id": "REQ-67",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 3,
        "reportedTime": "2025-05-06T09:40:00"
      },
      {
        "id": "REQ-68",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 5,
        "reportedTime": "2025-05-06T10:49:00"
      },
      {
        "id": "REQ-69",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T10:15:00"
      },
      {
        "id": "REQ-70",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 5,
        "reportedTime": "2025-05-06T10:49:00"
      },
      {
        "id": "REQ-71",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T10:29:00"
      },
      {
        "id": "REQ-72",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 4,
        "reportedTime": "2025-05-06T10:04:00"
      },
      {
        "id": "REQ-73",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 4,
        "reportedTime": "2025-05-06T11:23:00"
      },
      {
        "id": "REQ-74",
        "title": "Burglary",
        "description": "Suspected break-in reported.",
        "priority": 1,
        "reportedTime": "2025-05-06T11:11:00"
      },
      {
        "id": "REQ-75",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 5,
        "reportedTime": "2025-05-06T11:59:00"
      },
      {
        "id": "REQ-76",
        "title": "Burglary",
        "description": "Suspected break-in reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T11:47:00"
      },
      {
        "id": "REQ-77",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 3,
        "reportedTime": "2025-05-06T11:49:00"
      },
      {
        "id": "REQ-78",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 3,
        "reportedTime": "2025-05-06T11:44:00"
      },
      {
        "id": "REQ-79",
        "title": "Burglary",
        "description": "Suspected break-in reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T11:20:00"
      },
      {
        "id": "REQ-80",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 2,
        "reportedTime": "2025-05-06T11:52:00"
      },
      {
        "id": "REQ-81",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 4,
        "reportedTime": "2025-05-06T11:42:00"
      },
      {
        "id": "REQ-82",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 4,
        "reportedTime": "2025-05-06T12:26:00"
      },
      {
        "id": "REQ-83",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 1,
        "reportedTime": "2025-05-06T12:36:00"
      },
      {
        "id": "REQ-84",
        "title": "Burglary",
        "description": "Suspected break-in reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T12:51:00"
      },
      {
        "id": "REQ-85",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 3,
        "reportedTime": "2025-05-06T12:21:00"
      },
      {
        "id": "REQ-86",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T12:20:00"
      },
      {
        "id": "REQ-87",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 2,
        "reportedTime": "2025-05-06T12:10:00"
      },
      {
        "id": "REQ-88",
        "title": "Burglary",
        "description": "Suspected break-in reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T13:20:00"
      },
      {
        "id": "REQ-89",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T13:48:00"
      },
      {
        "id": "REQ-90",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 1,
        "reportedTime": "2025-05-06T13:03:00"
      },
      {
        "id": "REQ-91",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 5,
        "reportedTime": "2025-05-06T14:55:00"
      },
      {
        "id": "REQ-92",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 2,
        "reportedTime": "2025-05-06T14:39:00"
      },
      {
        "id": "REQ-93",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 2,
        "reportedTime": "2025-05-06T14:13:00"
      },
      {
        "id": "REQ-94",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 4,
        "reportedTime": "2025-05-06T14:57:00"
      },
      {
        "id": "REQ-95",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 4,
        "reportedTime": "2025-05-06T14:29:00"
      },
      {
        "id": "REQ-96",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 4,
        "reportedTime": "2025-05-06T14:43:00"
      },
      {
        "id": "REQ-97",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 3,
        "reportedTime": "2025-05-06T14:28:00"
      },
      {
        "id": "REQ-98",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 5,
        "reportedTime": "2025-05-06T15:36:00"
      },
      {
        "id": "REQ-99",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T15:13:00"
      },
      {
        "id": "REQ-100",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T15:58:00"
      },
      {
        "id": "REQ-101",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T16:09:00"
      },
      {
        "id": "REQ-102",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 4,
        "reportedTime": "2025-05-06T16:39:00"
      },
      {
        "id": "REQ-103",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 3,
        "reportedTime": "2025-05-06T16:02:00"
      },
      {
        "id": "REQ-104",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 4,
        "reportedTime": "2025-05-06T16:47:00"
      },
      {
        "id": "REQ-105",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 3,
        "reportedTime": "2025-05-06T16:50:00"
      },
      {
        "id": "REQ-106",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 3,
        "reportedTime": "2025-05-06T16:16:00"
      },
      {
        "id": "REQ-107",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T17:34:00"
      },
      {
        "id": "REQ-108",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 2,
        "reportedTime": "2025-05-06T17:57:00"
      },
      {
        "id": "REQ-109",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 3,
        "reportedTime": "2025-05-06T17:24:00"
      },
      {
        "id": "REQ-110",
        "title": "Burglary",
        "description": "Suspected break-in reported.",
        "priority": 2,
        "reportedTime": "2025-05-06T17:18:00"
      },
      {
        "id": "REQ-111",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T17:45:00"
      },
      {
        "id": "REQ-112",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 3,
        "reportedTime": "2025-05-06T17:45:00"
      },
      {
        "id": "REQ-113",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 2,
        "reportedTime": "2025-05-06T17:07:00"
      },
      {
        "id": "REQ-114",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 5,
        "reportedTime": "2025-05-06T17:12:00"
      },
      {
        "id": "REQ-115",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 2,
        "reportedTime": "2025-05-06T17:59:00"
      },
      {
        "id": "REQ-116",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T17:26:00"
      },
      {
        "id": "REQ-117",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 3,
        "reportedTime": "2025-05-06T18:02:00"
      },
      {
        "id": "REQ-118",
        "title": "Burglary",
        "description": "Suspected break-in reported.",
        "priority": 2,
        "reportedTime": "2025-05-06T18:57:00"
      },
      {
        "id": "REQ-119",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 5,
        "reportedTime": "2025-05-06T18:41:00"
      },
      {
        "id": "REQ-120",
        "title": "Burglary",
        "description": "Suspected break-in reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T18:55:00"
      },
      {
        "id": "REQ-121",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 1,
        "reportedTime": "2025-05-06T19:12:00"
      },
      {
        "id": "REQ-122",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 5,
        "reportedTime": "2025-05-06T19:17:00"
      },
      {
        "id": "REQ-123",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T19:17:00"
      },
      {
        "id": "REQ-124",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T19:21:00"
      },
      {
        "id": "REQ-125",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 4,
        "reportedTime": "2025-05-06T19:01:00"
      },
      {
        "id": "REQ-126",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 1,
        "reportedTime": "2025-05-06T19:26:00"
      },
      {
        "id": "REQ-127",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 4,
        "reportedTime": "2025-05-06T19:51:00"
      },
      {
        "id": "REQ-128",
        "title": "Car Accident",
        "description": "Multiple vehicle collision.",
        "priority": 5,
        "reportedTime": "2025-05-06T19:24:00"
      },
      {
        "id": "REQ-129",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T19:33:00"
      },
      {
        "id": "REQ-130",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 3,
        "reportedTime": "2025-05-06T20:28:00"
      },
      {
        "id": "REQ-131",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T20:10:00"
      },
      {
        "id": "REQ-132",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T20:23:00"
      },
      {
        "id": "REQ-133",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 5,
        "reportedTime": "2025-05-06T20:54:00"
      },
      {
        "id": "REQ-134",
        "title": "Medical Emergency",
        "description": "Person unconscious, needs medical help.",
        "priority": 5,
        "reportedTime": "2025-05-06T20:11:00"
      },
      {
        "id": "REQ-135",
        "title": "Electrical Hazard",
        "description": "Exposed electrical wiring reported.",
        "priority": 5,
        "reportedTime": "2025-05-06T21:27:00"
      },
      {
        "id": "REQ-136",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T21:20:00"
      },
      {
        "id": "REQ-137",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 5,
        "reportedTime": "2025-05-06T21:34:00"
      },
      {
        "id": "REQ-138",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 5,
        "reportedTime": "2025-05-06T21:33:00"
      },
      {
        "id": "REQ-139",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 5,
        "reportedTime": "2025-05-06T21:35:00"
      },
      {
        "id": "REQ-140",
        "title": "Animal Attack",
        "description": "Dog attack reported.",
        "priority": 2,
        "reportedTime": "2025-05-06T22:33:00"
      },
      {
        "id": "REQ-141",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 3,
        "reportedTime": "2025-05-06T22:08:00"
      },
      {
        "id": "REQ-142",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 5,
        "reportedTime": "2025-05-06T22:06:00"
      },
      {
        "id": "REQ-143",
        "title": "Structure Collapse",
        "description": "Building showing signs of collapse.",
        "priority": 5,
        "reportedTime": "2025-05-06T22:12:00"
      },
      {
        "id": "REQ-144",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 5,
        "reportedTime": "2025-05-06T23:44:00"
      },
      {
        "id": "REQ-145",
        "title": "Flooding",
        "description": "Water rising due to heavy rain.",
        "priority": 3,
        "reportedTime": "2025-05-06T23:41:00"
      },
      {
        "id": "REQ-146",
        "title": "Fire Outbreak",
        "description": "Reported fire at residential area.",
        "priority": 5,
        "reportedTime": "2025-05-06T23:42:00"
      },
      {
        "id": "REQ-147",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 3,
        "reportedTime": "2025-05-06T23:42:00"
      },
      {
        "id": "REQ-148",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 5,
        "reportedTime": "2025-05-06T23:32:00"
      },
      {
        "id": "REQ-149",
        "title": "Road Blockage",
        "description": "Tree fallen, blocking road.",
        "priority": 4,
        "reportedTime": "2025-05-06T23:20:00"
      },
      {
        "id": "REQ-150",
        "title": "Gas Leak",
        "description": "Strong smell of gas reported.",
        "priority": 4,
        "reportedTime": "2025-05-06T23:52:00"
      }
    ];


    setAssignedRequests(assignedRequestsArray);
    emergencyRequests.forEach((request) => {
      try {
        EmergencyRef.current.enqueue(request as EmergencyRequest);
      }
      catch (e) {
        console.log('Error Enqeueing data')
      }
    })

    setRequests(EmergencyRef.current.getAll());
  }, []);

  const enqueueRequest = (request: EmergencyRequest) => {
    try {
      EmergencyRef.current.enqueue(request);
      setRequests(EmergencyRef.current.getAll());
    }
    catch (e) {
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

      } else {
        console.log('No request to dequeue');
      }

      setRequests(EmergencyRef.current.getAll());

    } catch (e) {
      console.log('Error dequeuing request:', e);
    }
  }


  const getRequestSize = (): number => {
    return EmergencyRef.current.size();
  }

  const getAllRequests = () => {
    setRequests(mergeSort(EmergencyRef.current.getAll()));
    // setRequests(insertionSort(EmergencyRef.current.getAll()));
  }

  const updateRequest = (id: string, updatedFields: Partial<EmergencyRequest>): boolean => {
    try {
      EmergencyRef.current.updateRequest(id, updatedFields);
      setRequests(EmergencyRef.current.getAll());
      return true;
    }
    catch (e) {
      console.log('Error updating request');
      return false;
    }
  }

  const removeRequest = (id: string): boolean => {

    const success = EmergencyRef.current.removeById(id);

    if (success) {
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

  const resolveRequest = (requestId: string) => {
    try {
      const index = assignedRequests.findIndex(req => req.request.id === requestId);

      if (index === -1) {
        console.log('Request not found in assigned requests');
        return null;
      }

      const updatedRequests = [...assignedRequests];

      updatedRequests[index] = {
        ...updatedRequests[index],
        status: 'Resolved',
        resolvedTime: new Date().toISOString()
      };

      setAssignedRequests(updatedRequests);

    } catch (e) {
      console.log('Error resolving request:', e);
      return null;
    }
  };


  return (
    <EmergencyRequestContext.Provider value={{ requests, assignedRequests, enqueueRequest, dequeueRequest, getRequestSize, getAllRequests, updateRequest, removeRequest, assignRequestToOfficer, resolveRequest }}>
      {children}
    </EmergencyRequestContext.Provider>
  )

}

export const useEmergencyRequestContext = () => {
  const context = useContext(EmergencyRequestContext);

  if (!context) throw new Error("EmergencyRequestContext must be inside the EmergencyRequestProvider");

  return context;
}