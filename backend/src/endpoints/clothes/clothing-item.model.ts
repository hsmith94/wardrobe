export type ClothingItemId = number;

export type ClothingItem = {
    id: ClothingItemId;
    name: string;
    category: string;
    price: number;
    currency: string;
    image?: string;
};
