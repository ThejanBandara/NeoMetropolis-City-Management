import { EmergencyRequest } from "@/types/EmergencyRequest";
// Adt for the priority Queue

export interface ERPriorityQueueADT {
  enqueue(request: EmergencyRequest): void;
  dequeue(): EmergencyRequest | null;
  peek(): EmergencyRequest | null;
  isEmpty(): boolean; 
  size(): number;
  getAll(): EmergencyRequest[];
  updateRequest(id: string, updatedFields: Partial<EmergencyRequest>): boolean;
  removeById(id: string): boolean;
}

export class EmergencyRequestPriorityQueue implements ERPriorityQueueADT {
  private heap: EmergencyRequest[] = [];

  private parentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private leftChildIndex(index: number) {
    return 2 * index + 1;
  }

  private rightChildIndex(index: number) {
    return 2 * index + 2;
  }

  private swap(index1: number, index2: number) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  private heapifyUp(index: number) {
    let currentIndex = index;

    while (
      currentIndex > 0 &&
      this.heap[currentIndex].priority >
        this.heap[this.parentIndex(currentIndex)].priority
    ) {
      this.swap(currentIndex, this.parentIndex(currentIndex));
      currentIndex = this.parentIndex(currentIndex);
    }
  }

  private heapifyDown(index: number) {
    let largest = index;
    const left = this.leftChildIndex(index);
    const right = this.rightChildIndex(index);

    if (
      left < this.heap.length &&
      this.heap[left].priority > this.heap[largest].priority
    ) {
      largest = left;
    }

    if (
      right < this.heap.length &&
      this.heap[right].priority > this.heap[largest].priority
    ) {
      largest = right;
    }

    if (largest !== index) {
      this.swap(index, largest);
      this.heapifyDown(largest);
    }
  }

  enqueue(request: EmergencyRequest): void {
    this.heap.push(request);
    this.heapifyUp(this.heap.length - 1);
  }

  dequeue(): EmergencyRequest | null {
    if (this.isEmpty()) return null;

    if (this.heap.length === 1) return this.heap.pop()!;
    const root = this.heap[0];

    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);

    return root;
  }

  peek(): EmergencyRequest | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  size(): number {
    return this.heap.length;
  }

  getAll(): EmergencyRequest[] {
    const tempHeap = [...this.heap];
    const sorted: EmergencyRequest[] = [];

    while (tempHeap.length > 0) {
      // Extract the highest priority each time
      const max = tempHeap[0];
      const last = tempHeap.pop()!;
      if (tempHeap.length > 0) {
        tempHeap[0] = last;
        this.heapifyDownFrom(0, tempHeap);
      }
      sorted.push(max);
    }

    return sorted;
  }

  private heapifyDownFrom(index: number, heap: EmergencyRequest[]) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left < heap.length && heap[left].priority > heap[largest].priority) {
        largest = left;
    }

    if (right < heap.length && heap[right].priority > heap[largest].priority) {
        largest = right;
    }

    if (largest !== index) {
        [heap[index], heap[largest]] = [heap[largest], heap[index]];
        this.heapifyDownFrom(largest, heap);
    }
}


  updateRequest(id: string, updatedFields: Partial<EmergencyRequest>): boolean {
    const index = this.heap.findIndex((request) => request.id === id);
    if (index === -1) return false;

    this.heap[index] = { ...this.heap[index], ...updatedFields };

    this.heapifyUp(index);
    this.heapifyDown(index);

    return true;
  }

  removeById(id: string): boolean {
    const index = this.heap.findIndex((request) => request.id === id);
    if (index === -1) return false;

    const lastIndex = this.heap.length - 1;

    if (index !== lastIndex) {
      [this.heap[index], this.heap[lastIndex]] = [
        this.heap[lastIndex],
        this.heap[index],
      ];
    }

    this.heap.pop();

    this.heapifyUp(index);
    this.heapifyDown(index);

    return true;
  }
}
