import { AssignedEmergencyRequest } from "@/types/EmergencyRequest";

export const assignedRequestsArray : AssignedEmergencyRequest[] = [
  {
    "request": {
      "id": "REQ-1",
      "title": "Burglary",
      "description": "Suspected break-in reported.",
      "priority": 4,
      "reportedTime": "2025-05-06T00:00:00"
    },
    "assignedOfficer": "OFF1",
    "assignedTime": "2025-05-06T00:02:00",
    "status": "Resolved",
    "resolvedTime": "2025-05-06 00:18:00"
  },
  {
    "request": {
      "id": "REQ-2",
      "title": "Electrical Hazard",
      "description": "Exposed electrical wiring reported.",
      "priority": 4,
      "reportedTime": "2025-05-06T00:44:00"
    },
    "assignedOfficer": "OFF1",
    "assignedTime": "2025-05-06T00:45:00",
    "status": "assigned",
    "resolvedTime": ""
  },
  {
    "request": {
      "id": "REQ-3",
      "title": "Gas Leak",
      "description": "Strong smell of gas reported.",
      "priority": 2,
      "reportedTime": "2025-05-06T00:25:00"
    },
    "assignedOfficer": "OFF2",
    "assignedTime": "2025-05-06T00:30:00",
    "status": "Resolved",
    "resolvedTime": "2025-05-06 01:29:00"
  },
  {
    "request": {
      "id": "REQ-4",
      "title": "Structure Collapse",
      "description": "Building showing signs of collapse.",
      "priority": 4,
      "reportedTime": "2025-05-06T00:07:00"
    },
    "assignedOfficer": "OFF2",
    "assignedTime": "2025-05-06T00:10:00",
    "status": "Resolved",
    "resolvedTime": "2025-05-06 00:59:00"
  },
  {
    "request": {
      "id": "REQ-5",
      "title": "Gas Leak",
      "description": "Strong smell of gas reported.",
      "priority": 4,
      "reportedTime": "2025-05-06T01:25:00"
    },
    "assignedOfficer": "OFF2",
    "assignedTime": "2025-05-06T01:27:00",
    "status": "assigned",
    "resolvedTime": ""
  },
  {
    "request": {
      "id": "REQ-6",
      "title": "Road Blockage",
      "description": "Tree fallen, blocking road.",
      "priority": 3,
      "reportedTime": "2025-05-06T01:21:00"
    },
    "assignedOfficer": "OFF3",
    "assignedTime": "2025-05-06T01:23:00",
    "status": "assigned",
    "resolvedTime": ""
  },
  {
    "request": {
      "id": "REQ-7",
      "title": "Medical Emergency",
      "description": "Person unconscious, needs medical help.",
      "priority": 5,
      "reportedTime": "2025-05-06T01:29:00"
    },
    "assignedOfficer": "OFF4",
    "assignedTime": "2025-05-06T01:30:00",
    "status": "Resolved",
    "resolvedTime": "2025-05-06 02:09:00"
  },
  {
    "request": {
      "id": "REQ-8",
      "title": "Flooding",
      "description": "Water rising due to heavy rain.",
      "priority": 3,
      "reportedTime": "2025-05-06T01:10:00"
    },
    "assignedOfficer": "OFF4",
    "assignedTime": "2025-05-06T01:12:00",
    "status": "Resolved",
    "resolvedTime": "2025-05-06 01:33:00"
  },
  {
    "request": {
      "id": "REQ-9",
      "title": "Structure Collapse",
      "description": "Building showing signs of collapse.",
      "priority": 3,
      "reportedTime": "2025-05-06T01:15:00"
    },
    "assignedOfficer": "OFF4",
    "assignedTime": "2025-05-06T01:20:00",
    "status": "assigned",
    "resolvedTime": ""
  },
  {
    "request": {
      "id": "REQ-10",
      "title": "Road Blockage",
      "description": "Tree fallen, blocking road.",
      "priority": 4,
      "reportedTime": "2025-05-06T01:36:00"
    },
    "assignedOfficer": "OFF5",
    "assignedTime": "2025-05-06T01:41:00",
    "status": "assigned",
    "resolvedTime": ""
  }
];
