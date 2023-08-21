import { ClothingItem } from './clothing-item.model';

export class ClothesRepo {
    constructor() { }

    async getClothes(): Promise<ClothingItem[]> {
        const clothes = Promise.resolve(require('./clothes.json'));
        return clothes;
    }
}