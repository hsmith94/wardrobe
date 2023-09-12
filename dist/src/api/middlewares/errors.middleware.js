"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultErrorHandler = void 0;
function DefaultErrorHandler(err, req, res, next) {
    console.error(err.message, err.stack);
    res.status(500).send('Internal Server Error');
}
exports.DefaultErrorHandler = DefaultErrorHandler;
