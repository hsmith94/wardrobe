import { UserId } from '../../models/user.model';
import { ClothingItem, ClothingItemId } from './clothing-item.model';
import { ClothingItemsRepo } from './clothing-items.repo';

export class ClothesService {
    constructor(private clothingItemsRepo: ClothingItemsRepo) {}

    async getClothingItems(userId: UserId): Promise<ClothingItem[]> {
        const clothingItems = await this.clothingItemsRepo.getClothingItems(userId);
        return clothingItems;
    }

    async getClothingItem(userId: UserId, itemId: ClothingItemId): Promise<ClothingItem | undefined> {
        const clothingItem = await this.clothingItemsRepo.getClothingItem(userId, itemId);
        return clothingItem;
    }
}
