import path from 'path';
import { Route, RouteMethod } from '../server/models/routes.model';
import { ClothesEndpoint } from './endpoints/clothes/clothes.endpoint';
import { HealthCheckEndpoint } from './endpoints/health-check/health-check.endpoint';

const RESOURCES_DIR_PATH = path.resolve(__dirname, './resources');

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

    // TODO: FIXME: This doesn't appear to be serving the static files correctly.
    Route.fromStaticDir({
        path: '/resources',
        staticPath: RESOURCES_DIR_PATH,
    }),
];
