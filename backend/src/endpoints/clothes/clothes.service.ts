import { ClothesRepo } from './clothes.repo';
import { ClothingItem, ClothingItemId } from './clothing-item.model';

export class ClothesService {
    constructor(private clothesRepo: ClothesRepo) { }

    async getClothes(): Promise<ClothingItem[]> {
        const clothes = await this.clothesRepo.getClothes();
        return clothes;
    }

    async getClothingItem(id: ClothingItemId): Promise<ClothingItem | undefined> {
        const clothes = await this.getClothes();
        return clothes.find((item) => item.id === id);
    }
}