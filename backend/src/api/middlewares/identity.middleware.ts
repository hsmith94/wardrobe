import express from 'express';
import { Request } from '../models/request.model';

const TEST_USER_ID = 'HARRY';

export function IdentityMiddleware(req: Request, res: express.Response, next: express.NextFunction): void {
    console.log('IdentityMiddleware');

    req.userId = TEST_USER_ID;
    next();
}
