
import { Citizen } from "@/types/CitizenType";

// defining the ADT for the Citizen HashMap 
interface CitizenMapADT {
    insert(key: string, value: Citizen) : boolean;
    get(key: string) : Citizen | null;
    delete(key: string) : boolean;
    update(key: string, value: Citizen) : boolean;
    getAll() : Citizen[];
}

export class CitizenMap implements CitizenMapADT {

    private buckets: Array<Array<{key: string, value: Citizen}>>;
    private size: number;

    constructor(size = 100) {
        this.size = size;
        this.buckets = Array(size).fill(null).map(() => []);
    }

    private hash(key: string): number {
        let hashValue = 0;
        for (let i = 0; i < key.length; i++){
            hashValue = (hashValue * 31 + key.charCodeAt(i)) % this.size;
        }
        return hashValue;
    }

    insert(key: string, value: Citizen): boolean {

        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const entry of bucket){
            if(entry.key === key){
                console.log(`Citizen with same NIC : ${key} already exists`);
                return false;
            }
        }

        bucket.push({key, value});
        return true;
    }

    get(key: string): Citizen | null {

        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(const entry of bucket){
            if(entry.key === key){
                return entry.value;
            }
        }

        return null;
    }

    delete(key: string): boolean {
        
        const index = this.hash(key);
        const bucket = this.buckets[index];

        const DeleteItem = bucket.findIndex(entry => entry.key === key);

        if(DeleteItem !== -1){
            bucket.splice(DeleteItem, 1);
            return true;
        }

        return false;
    }

    update(key: string, value: Citizen): boolean {

        const index = this.hash(key);
        const bucket = this.buckets[index];

        return true;
        // update the value of the citizen
    }

    getAll(): Citizen[] {
        
        return this.buckets.flat().map(entry => entry.value);

    }
}