import express from 'express';

export function DefaultErrorHandler(err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void {
    console.error(err.message, err.stack);
    res.status(500).send('Internal Server Error');
}