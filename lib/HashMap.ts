export interface KeyValue<K, V> {
    key: K;
    value: V;
}

  export class HashMap<K extends string, V> {
    private buckets: KeyValue<K, V>[][];
    private size: number;
  
    constructor(size = 100) {
      this.size = size;
      this.buckets = Array(size)
        .fill(null)
        .map(() => []);
    }
  
    private hash(key: K): number {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
      }
      return hash % this.size;
    }
  
    set(key: K, value: V): void {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      const existing = bucket.find(entry => entry.key === key);
      if (existing) {
        throw new Error("Duplicate key");
      }
      bucket.push({ key, value });
    }
  
    get(key: K): V | undefined {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      return bucket.find(entry => entry.key === key)?.value;
    }
  
    getAll(): V[] {
      return this.buckets.flat().map(entry => entry.value);
    }
  }