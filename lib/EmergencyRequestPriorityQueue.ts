import EmergencyRequests from "@/components/EmergencyRequests";
import { EmergencyRequest } from "@/types/EmergencyReques";
// Adt for the priority Queue

export interface ERPriorityQueueADT {
    enqueue(request: EmergencyRequest): void;
    dequeue(): EmergencyRequest  | undefined;
    updateStatus(id: string, status: EmergencyRequest['status']): void
    updatePriority(id: string, priority: EmergencyRequest['priority']): void
    getAll(): EmergencyRequest[]
    peek(): EmergencyRequest | undefined;
}