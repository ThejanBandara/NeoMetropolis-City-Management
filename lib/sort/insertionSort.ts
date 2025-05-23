
import { EmergencyRequest } from "@/types/EmergencyRequest";

export function insertionSort(
  requests: EmergencyRequest[]
): EmergencyRequest[] {

  const arr = [...requests];

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j].priority < key.priority) {
      arr[j + 1] = arr[j];
      j--;
    }


    arr[j + 1] = key;
  }

  return arr;
}
