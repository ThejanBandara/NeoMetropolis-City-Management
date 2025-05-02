

export interface EmergencyRequest {
    id: string,
    title: string,
    description: string,
    priority: number,
    reportedTime: string,
}

export interface AssignedEmergencyRequest {
    request: EmergencyRequest;
    assignedOfficer: string;
    assignedTime: string;
    status: "assigned" | "Resolved";
    resolvedTime: string;
}