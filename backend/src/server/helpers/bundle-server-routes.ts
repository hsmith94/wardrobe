import * as express from 'express';
import path from 'path';
import { Route, RouteMethod } from '../models/routes.model';

const INDEX_HTML_FILENAME = 'index.html';

const ROOT_PATH = '/';
const ROOT_PATH_GLOB = '*';

/** @note This must be kept in sync with `<base href>` in the frontend. */
const APP_PATH = '/app';
const APP_PATH_GLOB = APP_PATH;

export class BundleRoutes {
    constructor() {}
    /** @param bundleDir Path to the frontend bundle directory. */
    static fromDir(bundleDir: string): Route[] {
        console.log('Mounting bundle directory:', bundleDir);
        const appIndexFile = path.resolve(bundleDir, INDEX_HTML_FILENAME);
        return [
            Route.fromConfig({
                path: ROOT_PATH,
                method: RouteMethod.GET,
                handler: (req, res) => res.redirect(APP_PATH),
            }),
            Route.fromConfig({
                path: ROOT_PATH_GLOB,
                method: RouteMethod.USE,
                handler: express.static(appIndexFile),
            }),
            Route.fromConfig({
                path: '',
                method: RouteMethod.USE,
                handler: express.static(bundleDir),
            }),
            Route.fromConfig({
                path: APP_PATH_GLOB,
                method: RouteMethod.USE,
                handler: express.static(bundleDir),
            }),
        ];
    }
}
