import express from 'express';
import { APP_NAME } from './constants';
import { MIDDLEWARES } from './middlewares';
import { ROUTES } from './routes';
import { Server } from './server/server';

const BASE_PATH = '/api/v1';
const PORT = 3000;

async function startServer(): Promise<void> {
    const server = new Server(express).configure({
        appName: APP_NAME,
        port: PORT,
        basePath: BASE_PATH,
        commonMiddlewares: MIDDLEWARES,
        routes: ROUTES,
    });

    await server.start();
}

startServer().then(() => {
    console.log(`${APP_NAME} listening on port: ${PORT}`);
}).catch((err) => {
    console.error(`FATAL: ${err.message}\n\n${err.stack}`)
});