"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtils = void 0;
var ResponseUtils;
(function (ResponseUtils) {
    function sendJson(res, body) {
        res.status(200).json(body);
    }
    ResponseUtils.sendJson = sendJson;
})(ResponseUtils || (exports.ResponseUtils = ResponseUtils = {}));
