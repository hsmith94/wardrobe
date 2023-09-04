import { Express } from 'express';
import { Route, RouteMiddleware } from '../models/routes.model';

export function applyRoutes(
    app: Express,
    basePath: string = '',
    commonMiddlewares: RouteMiddleware[] = [],
    routes: Route[],
): void {
    routes.forEach((route) => {
        app[route.method](`${basePath}${route.path}`, ...commonMiddlewares, ...route.middlewares, route.handler);
    });
}
