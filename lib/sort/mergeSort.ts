import { EmergencyRequest } from "@/types/EmergencyRequest";

export function mergeSort(requests: EmergencyRequest[]): EmergencyRequest[] {
  console.time('mergeSortTime');

  if (requests.length <= 1) {
    console.timeEnd('mergeSortTime');
    return requests;
  }

  const mid = Math.floor(requests.length / 2);
  const left = mergeSort(requests.slice(0, mid));
  const right = mergeSort(requests.slice(mid));

  const sortedRequests = merge(left, right);
  console.timeEnd('mergeSortTime');
  return sortedRequests;
}

function merge(
  left: EmergencyRequest[],
  right: EmergencyRequest[]
): EmergencyRequest[] {
  const result: EmergencyRequest[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i].priority >= right[j].priority) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i), right.slice(j));
}