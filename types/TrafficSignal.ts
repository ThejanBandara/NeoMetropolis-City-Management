// types.ts
import { Stack } from "@/lib/utils/Stack";

export type TrafficSignal = {
  id: string;
  name: string;
  Direction: "EW" | "WE" | "N" ; // East to west | West to Easr | North
  timing: number;
  state: "green" | "yellow" | "red";
  undoStack: Stack<number>;
  redoStack: Stack<number>;
};
