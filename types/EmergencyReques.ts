
export type Status = "Pending" | "Assigned" |"Resolved";

export interface EmergencyRequest {
    id: string,
    title: string,
    description: string,
    priority: number,
    status: Status
    reportedTime: string,
}