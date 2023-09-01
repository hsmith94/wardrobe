import { ClothingItemId } from '../endpoints/clothes/clothing-item.model';
import { Request } from '../middlewares/request.model';

export namespace RequestExtractors {
    export function extractClothingItemId(req: Request): ClothingItemId {
        return req.params.id;
    }
    export function extractUserId(req: Request): ClothingItemId {
        return req.userId;
    }
}
