"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.ClothingItemsRepo = exports.ClothingItemRowDto = void 0;
var http_errors_1 = require("../../errors/http-errors");
var clothing_item_model_1 = require("./clothing-item.model");
var ClothingItemRowDto = /** @class */ (function () {
    function ClothingItemRowDto() {
    }
    return ClothingItemRowDto;
}());
exports.ClothingItemRowDto = ClothingItemRowDto;
var QueryBuilder;
(function (QueryBuilder) {
    var Errors;
    (function (Errors) {
        var RequiredPropertyError = /** @class */ (function (_super) {
            __extends(RequiredPropertyError, _super);
            function RequiredPropertyError(property) {
                var _this = this;
                var _newTarget = this.constructor;
                var prototype = _newTarget.prototype;
                _this = _super.call(this, "Missing required property: ".concat(property)) || this;
                Object.setPrototypeOf(_this, prototype);
                _this.name = 'ApiError';
                return _this;
            }
            return RequiredPropertyError;
        }(Error));
        Errors.RequiredPropertyError = RequiredPropertyError;
    })(Errors || (Errors = {}));
    function buildSelectItemsQuery(options) {
        var userId = options.userId, itemId = options.itemId;
        var conditions = [
            {
                query: 'AND items.user_id = ?',
                params: [userId],
            },
        ];
        if (itemId !== undefined) {
            conditions.push({
                query: 'AND items.item_id = ?',
                params: [itemId],
            });
        }
        return {
            query: "\n                SELECT\n                    items.*,\n                    JSON_ARRAYAGG(\n                        IF(\n                            item_properties.property_key IS NULL,\n                            -- then\n                            NULL,\n                            -- else\n                            JSON_OBJECT(\n                                'key', item_properties.property_key,\n                                'value', item_properties.value,\n                                'metadata', CAST(item_properties.metadata AS JSON)\n                            )\n                        )\n                    ) AS properties\n                FROM items\n                LEFT JOIN item_properties ON items.item_id = item_properties.item_id\n                WHERE items.delete_date IS NULL\n                    ".concat(conditions.map(function (condition) { return condition.query; }).join('\n'), "\n                GROUP BY items.item_id\n            "),
            params: __spreadArray([], conditions.flatMap(function (condition) { return condition.params; }), true),
        };
    }
    function buildSelectAllItemsQuery(userId) {
        if (userId === undefined || userId === null || userId === '') {
            throw new Errors.RequiredPropertyError('userId');
        }
        return buildSelectItemsQuery({ userId: userId });
    }
    QueryBuilder.buildSelectAllItemsQuery = buildSelectAllItemsQuery;
    function buildSelectItemQuery(userId, itemId) {
        if (userId === undefined || userId === null || userId === '') {
            throw new Errors.RequiredPropertyError('userId');
        }
        if (itemId === undefined || itemId === null || itemId === '') {
            throw new Errors.RequiredPropertyError('itemId');
        }
        return buildSelectItemsQuery({ userId: userId, itemId: itemId });
    }
    QueryBuilder.buildSelectItemQuery = buildSelectItemQuery;
})(QueryBuilder || (QueryBuilder = {}));
var ClothingItemsRepo = /** @class */ (function () {
    function ClothingItemsRepo(connection) {
        this.connection = connection;
    }
    ClothingItemsRepo.prototype.getClothingItems = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, query, params, rows, clothingItems;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = QueryBuilder.buildSelectAllItemsQuery(userId), query = _a.query, params = _a.params;
                        return [4 /*yield*/, this.connection.query(query, params)];
                    case 1:
                        rows = _b.sent();
                        clothingItems = rows.map(function (row) { return clothing_item_model_1.ClothingItemDto.from(ClothingItemRowDto, row); });
                        return [2 /*return*/, clothingItems];
                }
            });
        });
    };
    ClothingItemsRepo.prototype.getClothingItem = function (userId, itemId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, query, params, rows, row, clothingItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = QueryBuilder.buildSelectItemQuery(userId, itemId), query = _a.query, params = _a.params;
                        return [4 /*yield*/, this.connection.query(query, params)];
                    case 1:
                        rows = _b.sent();
                        if (rows.length === 0) {
                            throw new http_errors_1.HttpErrors.NotFoundError("Clothing Item with id \"".concat(itemId, "\" not found"));
                        }
                        if (rows.length > 1) {
                            throw new Error("Too many Clothing Items found with id \"".concat(itemId, "\""));
                        }
                        row = rows[0];
                        clothingItem = clothing_item_model_1.ClothingItemDto.from(ClothingItemRowDto, row);
                        return [2 /*return*/, clothingItem];
                }
            });
        });
    };
    return ClothingItemsRepo;
}());
exports.ClothingItemsRepo = ClothingItemsRepo;
