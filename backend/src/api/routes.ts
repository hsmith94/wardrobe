import { Route, RouteMethod } from '../server/models/routes.model';
import { ClothesEndpoint } from './endpoints/clothes/clothes.endpoint';
import { HealthCheckEndpoint } from './endpoints/health-check/health-check.endpoint';

export const ROUTES = [
    Route.fromConfig({
        path: '/',
        method: RouteMethod.GET,
        handler: HealthCheckEndpoint.doHealthCheck,
    }),
    Route.fromConfig({
        path: '/clothes',
        method: RouteMethod.GET,
        handler: ClothesEndpoint.getClothes,
    }),
    Route.fromConfig({
        path: '/clothes/:id',
        method: RouteMethod.GET,
        handler: ClothesEndpoint.getClothingItem,
    }),
];
