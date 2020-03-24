export interface Crop {
    id?: string;
    cropId: string;
    room: string;
    crop: string;
    createdAt: Date;
    material?: string;
    toTrayAt?: Date;
    toBagAt?: Date;
    species?: Array<any>;
    status?: string;
}