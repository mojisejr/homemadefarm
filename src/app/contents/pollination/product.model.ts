export interface Product {
    id?: string,
    cropId: string,
    tagColor: string,
    grade: string,
    row: string,
    species: string,
    estHarvestDate?: Date,
    createdAt: Date,
    weight?: number,
    status?: string,
}