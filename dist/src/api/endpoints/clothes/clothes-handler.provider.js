"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideClothesHandlerInMemory = exports.provideClothesHandler = void 0;
var datasource_1 = require("../../../datasource");
var clothes_handler_1 = require("./clothes.handler");
var clothes_service_1 = require("./clothes.service");
var clothing_items_repo_1 = require("./clothing-items.repo");
var provideClothesHandler = function () {
    return (0, datasource_1.getDatasource)().connect(function (connection) {
        var clothingItemsRepo = new clothing_items_repo_1.ClothingItemsRepo(connection);
        var clothesService = new clothes_service_1.ClothesService(clothingItemsRepo);
        var clothesHandler = new clothes_handler_1.ClothesHandler(clothesService);
        return clothesHandler;
    });
};
exports.provideClothesHandler = provideClothesHandler;
var provideClothesHandlerInMemory = function () {
    var clothingItemsRepo = new clothing_items_repo_1.ClothingItemsRepoInMemory();
    var clothesService = new clothes_service_1.ClothesService(clothingItemsRepo);
    var clothesHandler = new clothes_handler_1.ClothesHandler(clothesService);
    return Promise.resolve(clothesHandler);
};
exports.provideClothesHandlerInMemory = provideClothesHandlerInMemory;
