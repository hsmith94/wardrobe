"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MYSQL_DB = exports.MYSQL_PASS = exports.MYSQL_USER = exports.MYSQL_PORT = exports.MYSQL_HOST = exports.IS_PRODUCTION = void 0;
var lodash_1 = require("lodash");
exports.IS_PRODUCTION = process.env.NODE_ENV === 'production';
exports.MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
exports.MYSQL_PORT = (0, lodash_1.parseInt)(process.env.MYSQL_PORT) || 3306;
exports.MYSQL_USER = process.env.MYSQL_USER || 'local';
exports.MYSQL_PASS = process.env.MYSQL_PASS || 'local';
exports.MYSQL_DB = process.env.MYSQL_DB || 'wardrobe_local';
