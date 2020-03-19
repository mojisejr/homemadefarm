export interface Activity {
    id?: string;
    cropId: string;
    date: Date;
    category: string;
    fertilizer: Array<Fertilizer>;
    description?: string;
    counter: number;
    previousDate?: Date;
}

export interface Fertilizer {
    formula: string;
    amount: number;
    unit: string;
}