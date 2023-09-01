import express from 'express';

export namespace ResponseUtils {
    export function sendJson(res: express.Response, body: any): void {
        res.status(200).json(body);
    }
}
