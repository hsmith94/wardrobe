import express from 'express';
import { HttpErrors } from '../../errors/http-errors';
import { Request } from '../../models/request.model';
import { ResponseUtils } from '../../utils/response-utils';

export module CurrentUserEndpoint {
    export const getCurrentUser = async (req: Request, res: express.Response, next: express.NextFunction) => {
        try {
            ResponseUtils.sendJson(res, req.userInfo);
        } catch (err) {
            console.error(err);
            if (err instanceof HttpErrors.NotFoundError) {
                res.sendStatus(404);
                return;
            }
            next(err);
        }
    };
}
