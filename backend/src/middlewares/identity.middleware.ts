import express from 'express';

export function IdentityMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
    console.log('IdentityMiddleware');
    next();
}