"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRoutes = void 0;
function applyRoutes(app, basePath, commonMiddlewares, routes) {
    if (basePath === void 0) { basePath = ''; }
    if (commonMiddlewares === void 0) { commonMiddlewares = []; }
    routes.forEach(function (route) {
        app[route.method].apply(app, __spreadArray(__spreadArray(__spreadArray(["".concat(basePath).concat(route.path)], commonMiddlewares, false), route.middlewares, false), [route.handler], false));
    });
}
exports.applyRoutes = applyRoutes;
