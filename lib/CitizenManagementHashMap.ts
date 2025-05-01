
import { Citizen } from "@/types/CitizenType";

// defining the ADT for the Citizen HashMap 
interface CitizenMapADT {
    insertCitizen(key: string, value: Citizen) : boolean;
    getCitizen(key: string) : Citizen | null;
    deleteCitizen(key: string) : boolean;
    updateCitizen(key: string, value: Citizen) : boolean;
    getAllCitizen() : Citizen[];
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

    insertCitizen(key: string, value: Citizen): boolean {

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

    getCitizen(key: string): Citizen | null {

        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(const entry of bucket){
            if(entry.key === key){
                return entry.value;
            }
        }

        return null;
    }

    deleteCitizen(key: string): boolean {
        
        const index = this.hash(key);
        const bucket = this.buckets[index];

        const DeleteItem = bucket.findIndex(entry => entry.key === key);

        if(DeleteItem !== -1){
            bucket.splice(DeleteItem, 1);
            return true;
        }

        return false;
    }

    updateCitizen(key: string, value: Citizen): boolean {

        const index = this.hash(key);
        const bucket = this.buckets[index];
    
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return true;
            }
        }
    
        return false;
    }

    getAllCitizen(): Citizen[] {
        
        return this.buckets.flat().map(entry => entry.value);

    }
}