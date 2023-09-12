"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = void 0;
var routes_model_1 = require("../server/models/routes.model");
var clothes_endpoint_1 = require("./endpoints/clothes/clothes.endpoint");
var current_user_endpoint_1 = require("./endpoints/current-user/current-user.endpoint");
var health_check_endpoint_1 = require("./endpoints/health-check/health-check.endpoint");
exports.ROUTES = [
    routes_model_1.Route.fromConfig({
        path: '/',
        method: routes_model_1.RouteMethod.GET,
        handler: health_check_endpoint_1.HealthCheckEndpoint.doHealthCheck,
    }),
    routes_model_1.Route.fromConfig({
        path: '/current-user',
        method: routes_model_1.RouteMethod.GET,
        handler: current_user_endpoint_1.CurrentUserEndpoint.getCurrentUser,
    }),
    routes_model_1.Route.fromConfig({
        path: '/clothes',
        method: routes_model_1.RouteMethod.GET,
        handler: clothes_endpoint_1.ClothesEndpoint.getClothes,
    }),
    routes_model_1.Route.fromConfig({
        path: '/clothes/:id',
        method: routes_model_1.RouteMethod.GET,
        handler: clothes_endpoint_1.ClothesEndpoint.getClothingItem,
    }),
];
