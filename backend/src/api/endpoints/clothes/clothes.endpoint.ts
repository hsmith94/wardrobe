import express from 'express';
import { HttpErrors } from '../../errors/http-errors';
import { Request } from '../../models/request.model';
import { provideClothesHandlerInMemory } from './clothes-handler.provider';
import { ClothesHandler } from './clothes.handler';

export module ClothesEndpoint {
    export const getClothes = async (req: Request, res: express.Response, next: express.NextFunction) => {
        try {
            const clothesHandler: ClothesHandler = await provideClothesHandlerInMemory();
            // const clothesHandler: ClothesHandler = await provideClothesHandler();
            await clothesHandler.getClothes(req, res);
        } catch (err) {
            console.error(err);
            if (err instanceof HttpErrors.NotFoundError) {
                res.sendStatus(404);
                return;
            }
            next(err);
        }
    };

    export const getClothingItem = async (req: Request, res: express.Response, next: express.NextFunction) => {
        try {
            const clothesHandler: ClothesHandler = await provideClothesHandlerInMemory();
            // const clothesHandler: ClothesHandler = await provideClothesHandler();
            await clothesHandler.getClothingItem(req, res);
        } catch (err) {
            console.error(err);
            if (err instanceof HttpErrors.NotFoundError) {
                res.sendStatus(404);
                return;
            }
            next(err);
        }
    };
}
