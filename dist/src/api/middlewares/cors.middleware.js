"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
var cors_1 = __importDefault(require("cors"));
var constants_1 = require("../../constants");
var environment_1 = require("../../environment");
var DevCorsOptions = {
    origin: [constants_1.FRONTEND_DEV_SERVER_BASE_URL],
};
// TODO: Set production configuration.
var ProdCorsOptions = {
    origin: undefined,
};
exports.CorsMiddleware = (0, cors_1.default)(environment_1.IS_PRODUCTION ? ProdCorsOptions : DevCorsOptions);
