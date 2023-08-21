import { AuthMiddleware } from "./middlewares/auth.middleware";
import { DefaultErrorHandler } from "./middlewares/errors.middleware";
import { IdentityMiddleware } from "./middlewares/identity.middleware";

export const MIDDLEWARES = [
    AuthMiddleware,
    IdentityMiddleware,
    DefaultErrorHandler,
];