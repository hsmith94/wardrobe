"use strict";
// TODO(hjs): Either integrate this `makeDatasourceError` concept, or remove it.
// export module DatasourceErrors2 {
//     export function makeDatasourceError(name: string) {
//         return class DatasourceError extends Error {
//             constructor(message: string) {
//                 const prototype = new.target.prototype;
//                 super(message);
//                 Object.setPrototypeOf(this, prototype);
//                 this.name = name;
//             }
//         };
//     }
//     export const DatasourceNotReadyError = makeDatasourceError('DatasourceNotReadyError');
//     export const DatasourceNotConfiguredError = makeDatasourceError('DatasourceNotConfiguredError');
//     export const DatasourceNotStartedError = makeDatasourceError('DatasourceNotStartedError');
//     export const DatasourceAlreadyConfiguredError = makeDatasourceError('DatasourceAlreadyConfiguredError');
//     export const DatasourceAlreadyStartedError = makeDatasourceError('DatasourceAlreadyStartedError');
//     export const DatasourceAlreadyStoppedError = makeDatasourceError('DatasourceAlreadyStoppedError');
// }
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
exports.DatasourceErrors = void 0;
var DatasourceErrors;
(function (DatasourceErrors) {
    var DatasourceError = /** @class */ (function (_super) {
        __extends(DatasourceError, _super);
        function DatasourceError(message) {
            var _this = this;
            var _newTarget = this.constructor;
            var prototype = _newTarget.prototype;
            _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, prototype);
            _this.name = 'DatasourceError';
            return _this;
        }
        return DatasourceError;
    }(Error));
    DatasourceErrors.DatasourceError = DatasourceError;
    var DatasourceNotReady = /** @class */ (function (_super) {
        __extends(DatasourceNotReady, _super);
        function DatasourceNotReady() {
            var _this = this;
            var _newTarget = this.constructor;
            var prototype = _newTarget.prototype;
            _this = _super.call(this, 'Datasource is not ready') || this;
            Object.setPrototypeOf(_this, prototype);
            _this.name = 'DatasourceNotReady';
            return _this;
        }
        return DatasourceNotReady;
    }(DatasourceError));
    DatasourceErrors.DatasourceNotReady = DatasourceNotReady;
    var DatasourceNotConfigured = /** @class */ (function (_super) {
        __extends(DatasourceNotConfigured, _super);
        function DatasourceNotConfigured() {
            var _this = this;
            var _newTarget = this.constructor;
            var prototype = _newTarget.prototype;
            _this = _super.call(this, 'Datasource is not configured') || this;
            Object.setPrototypeOf(_this, prototype);
            _this.name = 'DatasourceNotConfigured';
            return _this;
        }
        return DatasourceNotConfigured;
    }(DatasourceError));
    DatasourceErrors.DatasourceNotConfigured = DatasourceNotConfigured;
    var DatasourceNotStarted = /** @class */ (function (_super) {
        __extends(DatasourceNotStarted, _super);
        function DatasourceNotStarted() {
            var _this = this;
            var _newTarget = this.constructor;
            var prototype = _newTarget.prototype;
            _this = _super.call(this, 'Datasource is not started') || this;
            Object.setPrototypeOf(_this, prototype);
            _this.name = 'DatasourceNotStarted';
            return _this;
        }
        return DatasourceNotStarted;
    }(DatasourceError));
    DatasourceErrors.DatasourceNotStarted = DatasourceNotStarted;
    var DatasourceAlreadyConfigured = /** @class */ (function (_super) {
        __extends(DatasourceAlreadyConfigured, _super);
        function DatasourceAlreadyConfigured() {
            var _this = this;
            var _newTarget = this.constructor;
            var prototype = _newTarget.prototype;
            _this = _super.call(this, 'Datasource is already configured') || this;
            Object.setPrototypeOf(_this, prototype);
            _this.name = 'DatasourceAlreadyConfigured';
            return _this;
        }
        return DatasourceAlreadyConfigured;
    }(DatasourceError));
    DatasourceErrors.DatasourceAlreadyConfigured = DatasourceAlreadyConfigured;
    var DatasourceAlreadyStarted = /** @class */ (function (_super) {
        __extends(DatasourceAlreadyStarted, _super);
        function DatasourceAlreadyStarted() {
            var _this = this;
            var _newTarget = this.constructor;
            var prototype = _newTarget.prototype;
            _this = _super.call(this, 'Datasource is already started') || this;
            Object.setPrototypeOf(_this, prototype);
            _this.name = 'DatasourceAlreadyStarted';
            return _this;
        }
        return DatasourceAlreadyStarted;
    }(DatasourceError));
    DatasourceErrors.DatasourceAlreadyStarted = DatasourceAlreadyStarted;
    var DatasourceAlreadyStopped = /** @class */ (function (_super) {
        __extends(DatasourceAlreadyStopped, _super);
        function DatasourceAlreadyStopped() {
            var _this = this;
            var _newTarget = this.constructor;
            var prototype = _newTarget.prototype;
            _this = _super.call(this, 'Datasource is already stopped') || this;
            Object.setPrototypeOf(_this, prototype);
            _this.name = 'DatasourceAlreadyStopped';
            return _this;
        }
        return DatasourceAlreadyStopped;
    }(DatasourceError));
    DatasourceErrors.DatasourceAlreadyStopped = DatasourceAlreadyStopped;
    var DatasourceStopped = /** @class */ (function (_super) {
        __extends(DatasourceStopped, _super);
        function DatasourceStopped() {
            var _this = this;
            var _newTarget = this.constructor;
            var prototype = _newTarget.prototype;
            _this = _super.call(this, 'Datasource is stopped') || this;
            Object.setPrototypeOf(_this, prototype);
            _this.name = 'DatasourceStopped';
            return _this;
        }
        return DatasourceStopped;
    }(DatasourceError));
    DatasourceErrors.DatasourceStopped = DatasourceStopped;
})(DatasourceErrors || (exports.DatasourceErrors = DatasourceErrors = {}));
