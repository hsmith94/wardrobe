import express from 'express';

export type RouteHandler = (req: any, res: any, next?: any) => void;
export type RouteMiddleware = express.Handler | express.ErrorRequestHandler;

type RouteConfig = {
    path: string;
    method: RouteMethod;
    handler: RouteHandler;
    middlewares?: RouteMiddleware[];
};

export enum RouteMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
    OPTIONS = 'options',
    HEAD = 'head',
    ALL = 'all',
}

export class Route {
    public path!: string;
    public method!: RouteMethod;
    public handler!: RouteHandler;
    public middlewares!: RouteMiddleware[];

    static fromConfig(config: RouteConfig): Route {
        const route = new Route();
        route.path = config.path;
        route.method = config.method;
        route.handler = config.handler;
        route.middlewares = config.middlewares ?? [];
        return route;
    }

    static fromStaticDir(config: { path: string; staticPath: string }): Route {
        console.log(config);
        return Route.fromConfig({
            path: config.path,
            method: RouteMethod.GET,
            handler: express.static(config.staticPath),
        });
    }
}
