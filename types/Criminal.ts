export interface Criminal {
    name: string;
    gender: "male" | "female" | "other" | "unknown";

    crimeType: string;
    crimeDescription: string;
    date: string;

    isrepeatOffender: boolean;
    status: "under_investigation" | "in_court" | "convicted" | "released";
}