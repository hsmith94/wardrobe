"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
function AuthMiddleware(req, res, next) {
    console.log('AuthMiddleware');
    next();
}
exports.AuthMiddleware = AuthMiddleware;
