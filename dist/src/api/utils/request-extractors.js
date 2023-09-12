"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestExtractors = void 0;
var RequestExtractors;
(function (RequestExtractors) {
    function extractClothingItemId(req) {
        return req.params.id;
    }
    RequestExtractors.extractClothingItemId = extractClothingItemId;
    function extractUserId(req) {
        return req.userId;
    }
    RequestExtractors.extractUserId = extractUserId;
})(RequestExtractors || (exports.RequestExtractors = RequestExtractors = {}));
