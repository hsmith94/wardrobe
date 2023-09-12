"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIDDLEWARES = void 0;
var auth_middleware_1 = require("./api/middlewares/auth.middleware");
var cors_middleware_1 = require("./api/middlewares/cors.middleware");
var errors_middleware_1 = require("./api/middlewares/errors.middleware");
var identity_middleware_1 = require("./api/middlewares/identity.middleware");
exports.MIDDLEWARES = [cors_middleware_1.CorsMiddleware, auth_middleware_1.AuthMiddleware, identity_middleware_1.IdentityMiddleware, errors_middleware_1.DefaultErrorHandler];
