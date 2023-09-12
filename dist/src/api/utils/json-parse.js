"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonParse = void 0;
function jsonParse(json) {
    if (json === null) {
        return undefined;
    }
    return JSON.parse(json);
}
exports.jsonParse = jsonParse;
