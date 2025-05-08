export interface officer {
    id: string;
    name: string;
    password: string;
    isAvailable: boolean;
    role: 'officer' | 'admin';
  }
  
  // Sample officer login credentials
  export const officers: officer[] = [
    { id : "OFF1", name: "Alice", password: "alice", isAvailable: false, role: "officer" },
    { id : "OFF2", name: "Bob", password: "bob", isAvailable: false, role: "officer" },
    { id : "OFF3", name: "Charlie", password: "charlie", isAvailable: false, role: "officer" },
    { id : "OFF4", name: "Diana", password: "diana", isAvailable: false, role: "officer" },
    { id : "OFF5", name: "Eve", password: "eve", isAvailable: false, role: "officer" },
  ];
  