import { Criminal } from "@/types/Criminal";

interface CriminalMapADT {
    inserCriminal(name: string, value: Criminal): boolean;
    getCriminal(name: string): Criminal | null;
    deleteCriminal(name: string) : boolean;
    updateCriminal(name: string, value: Criminal) : boolean;
    getAllCriminals() : Criminal[];
}

export class CriminalHashMap implements CriminalMapADT {

    private buckets: Array<Array<{name: string, value: Criminal}>>;
    private size: number;

    constructor(size = 100){
        this.size = size;
        this.buckets = Array(size).fill(null).map(() => []);
    }

    private Hash(name: string): number {
        let hashValue = 0;
        for (let i = 0; i < name.length; i++){
            hashValue = (hashValue * 31 + name.charCodeAt(i)) % this.size;
        }

        return hashValue;
    }

    inserCriminal(name: string, value: Criminal): boolean {

        const index = this.Hash(name);
        const bucket = this.buckets[index];

        for (const entry of bucket) {
            if (entry.name === name){
                console.log('criminal record with same name exsists')
                return(false)
            }
        }

        bucket.push({name, value});
        return true;
    }

    getCriminal(name: string): Criminal | null {

        const index = this.Hash(name);
        const bucket = this.buckets[index];

        for(const entry of bucket){
            if(entry.name === name){
                return entry.value
            }
        }

        return null;
    }

    deleteCriminal(name: string): boolean {

        const index = this.Hash(name);
        const bucket = this.buckets[index];

        const DeleteCriminal = bucket.findIndex(entry => entry.name === name);

        if(DeleteCriminal !== -1){
            bucket.splice(DeleteCriminal, 1);
            return true;
        }

        return false;
    }

    updateCriminal(name: string, value: Criminal): boolean {
        
        const index = this.Hash(name);
        const bucket = this.buckets[index];

        // update the value of the criminal

        return true
    }

    getAllCriminals(): Criminal[] {

        return this.buckets.flat().map(entry => entry.value);
    }
}