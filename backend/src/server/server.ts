import type Express from 'express';
import express from 'express';
import { Route, RouteMiddleware } from './models/routes.model';
import { applyRoutes as assignRoutes } from './helpers/routes.helper';

type ServerConfig = {
    appName: string;
    port: number;
    basePath?: string;
    commonMiddlewares?: RouteMiddleware[];
    routes: Route[];
};

export class Server {
    public appName!: string;
    public port!: number;
    public basePath!: string;
    public commonMiddlewares!: RouteMiddleware[];
    public routes!: Route[];

    private isConfigured: boolean = false;

    constructor(private express: typeof Express) { }

    public configure(config: ServerConfig): this {
        this.appName = config.appName;
        this.port = config.port;
        this.routes = config.routes;

        // Optional properties
        this.basePath = config.basePath ?? '';
        this.commonMiddlewares = config.commonMiddlewares ?? [];

        // Internal properties
        this.isConfigured = true;

        return this;
    }

    private createExpressApp(): express.Express {
        const app = this.express();

        assignRoutes(app, this.basePath, this.commonMiddlewares, this.routes);

        return app;
    }

    private startExpressServer(app: express.Express): Promise<void> {
        return new Promise((resolve, reject) => {
            const port = this.port;

            // Start server
            app.listen(port, () => {
                resolve();
            });

            app.on('error', (err) => {
                reject(err);
            });
        });
    }

    public async start(): Promise<void> {
        if (!this.isConfigured) {
            throw new Error('Server is not configured!');
        }

        const app = this.createExpressApp();

        await this.startExpressServer(app);
    }
}