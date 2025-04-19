
export type Status = "Pending" | "In_Progress" |"resolved";

export interface EmergencyRequest {
    id: string,
    description: string,
    priority: number,
    status: Status
}