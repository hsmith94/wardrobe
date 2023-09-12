"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var datasource_1 = require("./datasource");
var datasource_errors_1 = require("./datasource-errors");
describe('Datasource', function () {
    var mockConnection;
    var mockPool;
    var mockMysqlClient;
    var datasource;
    beforeEach(function () {
        mockConnection = {
            query: jest.fn(function (sql, params, callback) { return callback(null, []); }),
        };
        mockPool = {
            getConnection: jest.fn(function (callback) {
                callback(null, mockConnection);
            }),
            end: jest.fn(function (callback) {
                callback(null);
            }),
        };
        mockMysqlClient = {
            createPool: jest.fn(function () { return mockPool; }),
        };
        datasource = new datasource_1.Datasource(mockMysqlClient);
    });
    describe('configure', function () {
        it('should set the datasource configuration', function () {
            // Arrange
            var host = 'localhost';
            var port = 3306;
            var username = 'root';
            var password = 'password';
            var database = 'test_db';
            // Act
            datasource.configure({ host: host, port: port, username: username, password: password, database: database });
            // Assert
            expect(datasource['host']).toEqual(host);
            expect(datasource['port']).toEqual(port);
            expect(datasource['username']).toEqual(username);
            expect(datasource['password']).toEqual(password);
            expect(datasource['database']).toEqual(database);
            expect(datasource['isConfigured']).toBeTruthy();
        });
    });
    describe('start', function () {
        it('should start the datasource', function () { return __awaiter(void 0, void 0, void 0, function () {
            var host, port, username, password, database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = 'localhost';
                        port = 3306;
                        username = 'root';
                        password = 'password';
                        database = 'test_db';
                        datasource.configure({ host: host, port: port, username: username, password: password, database: database });
                        // Act
                        return [4 /*yield*/, datasource.start()];
                    case 1:
                        // Act
                        _a.sent();
                        // Assert
                        expect(mockPool.getConnection).toHaveBeenCalled();
                        expect(datasource['isStarted']).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if datasource is not configured', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Act & Assert
                    return [4 /*yield*/, expect(datasource.start()).rejects.toThrow(datasource_errors_1.DatasourceErrors.DatasourceError)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('stop', function () {
        it('should stop the datasource', function () { return __awaiter(void 0, void 0, void 0, function () {
            var host, port, username, password, database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = 'localhost';
                        port = 3306;
                        username = 'root';
                        password = 'password';
                        database = 'test_db';
                        datasource.configure({ host: host, port: port, username: username, password: password, database: database });
                        return [4 /*yield*/, datasource.start()];
                    case 1:
                        _a.sent();
                        // Act
                        return [4 /*yield*/, datasource.stop()];
                    case 2:
                        // Act
                        _a.sent();
                        // Assert
                        expect(mockPool.end).toHaveBeenCalled();
                        expect(datasource['isStopped']).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if datasource is not started', function () { return __awaiter(void 0, void 0, void 0, function () {
            var host, port, username, password, database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = 'localhost';
                        port = 3306;
                        username = 'root';
                        password = 'password';
                        database = 'test_db';
                        datasource.configure({ host: host, port: port, username: username, password: password, database: database });
                        // Act & Assert
                        return [4 /*yield*/, expect(datasource.stop()).rejects.toThrow(datasource_errors_1.DatasourceErrors.DatasourceError)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getConnection', function () {
        it('should return a connection', function () { return __awaiter(void 0, void 0, void 0, function () {
            var host, port, username, password, database, mockConnection, expectedConnection, callback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = 'localhost';
                        port = 3306;
                        username = 'root';
                        password = 'password';
                        database = 'test_db';
                        datasource.configure({ host: host, port: port, username: username, password: password, database: database });
                        return [4 /*yield*/, datasource.start()];
                    case 1:
                        _a.sent();
                        mockConnection = {};
                        mockPool.getConnection = jest.fn(function (callback) {
                            callback(null, mockConnection);
                        });
                        expectedConnection = new datasource_1.Connection(mockConnection);
                        callback = jest.fn();
                        return [4 /*yield*/, datasource.connect(callback)];
                    case 2:
                        _a.sent();
                        // Assert
                        expect(callback).toBeCalledWith(expectedConnection);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if datasource is not started', function () { return __awaiter(void 0, void 0, void 0, function () {
            var host, port, username, password, database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = 'localhost';
                        port = 3306;
                        username = 'root';
                        password = 'password';
                        database = 'test_db';
                        datasource.configure({ host: host, port: port, username: username, password: password, database: database });
                        // Act & Assert
                        return [4 /*yield*/, expect(datasource.connect(lodash_1.noop)).rejects.toThrow(datasource_errors_1.DatasourceErrors.DatasourceError)];
                    case 1:
                        // Act & Assert
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
