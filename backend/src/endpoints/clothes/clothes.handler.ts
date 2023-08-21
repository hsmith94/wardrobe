import express from 'express';
import { ClothesRepo } from './clothes.repo';
import { ClothesService } from './clothes.service';
import { ClothingItemId } from './clothing-item.model';

export class ClothesHandler {
    constructor(private clothesService: ClothesService) { }

    private extractClothingItemId(req: express.Request): ClothingItemId {
        return parseInt(req.params.id);
    }

    async getClothes(req: express.Request, res: express.Response) {
        const clothes = await this.clothesService.getClothes();
        res.status(200).json(clothes);
    }

    async getClothingItem(req: express.Request, res: express.Response) {
        const id = this.extractClothingItemId(req)
        const item = await this.clothesService.getClothingItem(id);
        res.status(200).json(item);
    }
}

export default new ClothesHandler(new ClothesService(new ClothesRepo()));