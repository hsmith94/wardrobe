"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = exports.RouteMethod = void 0;
var RouteMethod;
(function (RouteMethod) {
    RouteMethod["GET"] = "get";
    RouteMethod["POST"] = "post";
    RouteMethod["PUT"] = "put";
    RouteMethod["DELETE"] = "delete";
    RouteMethod["PATCH"] = "patch";
    RouteMethod["OPTIONS"] = "options";
    RouteMethod["HEAD"] = "head";
    RouteMethod["ALL"] = "all";
    RouteMethod["USE"] = "use";
})(RouteMethod || (exports.RouteMethod = RouteMethod = {}));
var Route = /** @class */ (function () {
    function Route() {
    }
    Route.fromConfig = function (config) {
        var _a;
        var route = new Route();
        route.path = config.path;
        route.method = config.method;
        route.handler = config.handler;
        route.middlewares = (_a = config.middlewares) !== null && _a !== void 0 ? _a : [];
        return route;
    };
    return Route;
}());
exports.Route = Route;
