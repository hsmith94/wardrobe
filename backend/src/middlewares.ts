import { AuthMiddleware } from './api/middlewares/auth.middleware';
import { DefaultErrorHandler } from './api/middlewares/errors.middleware';
import { IdentityMiddleware } from './api/middlewares/identity.middleware';

export const MIDDLEWARES = [AuthMiddleware, IdentityMiddleware, DefaultErrorHandler];
