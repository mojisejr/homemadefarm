export interface Seed {
    id?: string;
    name: string;
    harvestday: number;
    brix?: string;
    meatColor?: string;
    texture?: string;
    isNet?: string;
    total: number;
    lastInDate?: Date;
    lastOutDate?: Date;
    createdAt?: Date;
    pictureUrl?: string;
}