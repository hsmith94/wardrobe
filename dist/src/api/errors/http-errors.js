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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrors = void 0;
var HttpErrors;
(function (HttpErrors) {
    var HttpError = /** @class */ (function (_super) {
        __extends(HttpError, _super);
        function HttpError(message) {
            var _this = this;
            var _newTarget = this.constructor;
            var prototype = _newTarget.prototype;
            _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, prototype);
            _this.name = 'HttpError';
            return _this;
        }
        return HttpError;
    }(Error));
    HttpErrors.HttpError = HttpError;
    var NotFoundError = /** @class */ (function (_super) {
        __extends(NotFoundError, _super);
        function NotFoundError(message) {
            var _this = this;
            var _newTarget = this.constructor;
            var prototype = _newTarget.prototype;
            _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, prototype);
            _this.name = 'NotFoundError';
            return _this;
        }
        return NotFoundError;
    }(HttpError));
    HttpErrors.NotFoundError = NotFoundError;
})(HttpErrors || (exports.HttpErrors = HttpErrors = {}));
