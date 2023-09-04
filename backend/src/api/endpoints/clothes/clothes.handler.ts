import express from 'express';
import { Request } from '../../models/request.model';
import { RequestExtractors } from '../../utils/request-extractors';
import { ResponseUtils } from '../../utils/response-utils';
import { ClothesService } from './clothes.service';

export class ClothesHandler {
    constructor(private clothesService: ClothesService) {}

    async getClothes(req: Request, res: express.Response) {
        const userId = RequestExtractors.extractUserId(req);
        const clothes = await this.clothesService.getClothingItems(userId);
        ResponseUtils.sendJson(res, clothes);
    }

    async getClothingItem(req: Request, res: express.Response) {
        const userId = RequestExtractors.extractUserId(req);
        const itemId = RequestExtractors.extractClothingItemId(req);
        const item = await this.clothesService.getClothingItem(userId, itemId);
        ResponseUtils.sendJson(res, item);
    }
}
