
export type Status = "Pending" | "In_Progress" |"resolved";

export interface EmergencyRequest {
    id: string,
    title: string,
    description: string,
    priority: number,
    status: Status
    reportedTime: string,
    assignedTime: string,
    resolvedTime: string,   
}