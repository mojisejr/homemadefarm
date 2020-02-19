export interface Crop {
    id?: string;
    cropId: string;
    createdAt: Date;
    toTrayAt?: Date;
    toBagAt?: Date;
    species?: Array<any>;
    status?: string;
}