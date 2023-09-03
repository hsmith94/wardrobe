import { getDatasource } from '../../../datasource';
import { ClothesHandler } from './clothes.handler';
import { ClothesService } from './clothes.service';
import { ClothingItemsRepo } from './clothing-items.repo';

export const provideClothesHandler = (): Promise<ClothesHandler> => {
    return getDatasource().connect((connection) => {
        const clothingItemsRepo = new ClothingItemsRepo(connection);
        const clothesService = new ClothesService(clothingItemsRepo);
        const clothesHandler = new ClothesHandler(clothesService);
        return clothesHandler;
    });
};
