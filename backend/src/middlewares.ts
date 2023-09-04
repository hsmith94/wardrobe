import { AuthMiddleware } from './api/middlewares/auth.middleware';
import { CorsMiddleware } from './api/middlewares/cors.middleware';
import { DefaultErrorHandler } from './api/middlewares/errors.middleware';
import { IdentityMiddleware } from './api/middlewares/identity.middleware';

export const MIDDLEWARES = [CorsMiddleware, AuthMiddleware, IdentityMiddleware, DefaultErrorHandler];
