import express from 'express';
import { ROUTES } from './api/routes';
import { API_BASE_PATH, API_PORT, APP_NAME } from './constants';
import { MIDDLEWARES } from './middlewares';
import { Server } from './server/server';

export async function startServer(): Promise<void> {
    const server = new Server(express).configure({
        appName: APP_NAME,
        port: API_PORT,
        basePath: API_BASE_PATH,
        commonMiddlewares: MIDDLEWARES,
        routes: ROUTES,
    });

    await server.start();
}
