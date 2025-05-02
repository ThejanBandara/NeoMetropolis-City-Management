import { Criminal } from "@/types/Criminal";

interface CriminalMapADT {
    insertCriminal(id: string, value: Criminal): boolean;
    getCriminal(name: string): Criminal | null;
    deleteCriminal(id: string) : boolean;
    updateCriminal(id: string, value: Criminal) : boolean;
    getCriminalSize() : number;
    getAllCriminals() : Criminal[];
}

export class CriminalMap implements CriminalMapADT {

   private map: Map<string, Criminal>;

   constructor(){
    this.map = new Map()
   }

   insertCriminal(id: string, value: Criminal): boolean {
       if(this.map.has(id)){
        console.log("Criminal record with the same ID exsists");
        return false;
       }
       else{
        this.map.set(id,value);
        return true;
       }
   }

   getCriminal(name: string): Criminal | null {
    return this.map.get(name) || null;
   }

   deleteCriminal(id: string): boolean {
       return this.map.delete(id);
   }

   updateCriminal(id: string, value: Criminal): boolean {
       if(this.map.has(id)){
        this.map.set(id, value);
        return true;
       }
       else{
        return false;
       }
   }

   getCriminalSize(): number {
    return this.map.size;
   }

   getAllCriminals(): Criminal[] {
    return Array.from(this.map.values());
   }
}