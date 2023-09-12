"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClothingItemDto = void 0;
var lodash_1 = require("lodash");
var dto_errors_1 = require("../../errors/dto-errors");
var json_parse_1 = require("../../utils/json-parse");
var clothing_items_repo_1 = require("./clothing-items.repo");
var ClothingItemDto = /** @class */ (function () {
    function ClothingItemDto() {
    }
    ClothingItemDto.fromClothesRow = function (row) {
        var cleanProperties = function (properties) {
            return (0, lodash_1.compact)(properties);
        };
        return {
            itemId: row.item_id,
            userId: row.user_id,
            name: row.name,
            description: row.description,
            picture: row.picture,
            createDate: row.create_date,
            updateDate: row.update_date,
            properties: cleanProperties((0, json_parse_1.jsonParse)(row.properties)),
        };
    };
    ClothingItemDto.from = function (dto, val) {
        if (dto === clothing_items_repo_1.ClothingItemRowDto) {
            return this.fromClothesRow(val);
        }
        else {
            throw new dto_errors_1.DtoErrors.UnknownDtoError(dto);
        }
    };
    return ClothingItemDto;
}());
exports.ClothingItemDto = ClothingItemDto;
