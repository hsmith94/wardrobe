import express from 'express';
import path from 'path';
import { ROUTES } from './api/routes';
import { API_BASE_PATH, API_PORT, APP_NAME } from './constants';
import * as environment from './environment';
import { MIDDLEWARES } from './middlewares';
import { Server } from './server/server';

const PROJECT_ROOT_DIR = path.resolve(__dirname, '../..');
const BUNDLE_DIR = path.resolve(PROJECT_ROOT_DIR, './dist/frontend');

export async function startServer(): Promise<void> {
    const server = new Server(express).configure({
        appName: APP_NAME,
        port: API_PORT,
        basePath: API_BASE_PATH,
        commonMiddlewares: MIDDLEWARES,
        routes: ROUTES,
        bundleDir: environment.IS_PRODUCTION ? BUNDLE_DIR : undefined,
    });

    await server.start();
}
