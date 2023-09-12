"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTimeoutPromise = void 0;
var setTimeoutPromise = function (fn, delay) {
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(fn()); }, delay); });
};
exports.setTimeoutPromise = setTimeoutPromise;
