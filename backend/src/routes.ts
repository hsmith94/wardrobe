import Clothes from './endpoints/clothes/clothes.handler';
import * as HealthCheck from './endpoints/health-check/health-check.handler';
import { Route, RouteMethod } from './server/models/routes.model';

export const ROUTES = [
    Route.fromConfig({
        path: '/',
        method: RouteMethod.GET,
        handler: HealthCheck.handler,
    }),
    Route.fromConfig({
        path: '/clothes',
        method: RouteMethod.GET,
        handler: Clothes.getClothes.bind(Clothes),
    }),
    Route.fromConfig({
        path: '/clothes/:id',
        method: RouteMethod.GET,
        handler: Clothes.getClothingItem.bind(Clothes),
    }),
];
