import express from 'express';

export function AuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
    console.log('AuthMiddleware');
    next();
}