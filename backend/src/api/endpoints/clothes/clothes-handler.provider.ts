import { getDatasource } from '../../../datasource';
import { ClothesHandler } from './clothes.handler';
import { ClothesService } from './clothes.service';
import { ClothingItemsRepo, ClothingItemsRepoInMemory } from './clothing-items.repo';

export const provideClothesHandler = (): Promise<ClothesHandler> => {
    return getDatasource().connect((connection) => {
        const clothingItemsRepo = new ClothingItemsRepo(connection);
        const clothesService = new ClothesService(clothingItemsRepo);
        const clothesHandler = new ClothesHandler(clothesService);
        return clothesHandler;
    });
};

export const provideClothesHandlerInMemory = (): Promise<ClothesHandler> => {
    const clothingItemsRepo = new ClothingItemsRepoInMemory();
    const clothesService = new ClothesService(clothingItemsRepo);
    const clothesHandler = new ClothesHandler(clothesService);
    return Promise.resolve(clothesHandler);
};
