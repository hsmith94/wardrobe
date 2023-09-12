"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignBundleServer = void 0;
var express = __importStar(require("express"));
var path_1 = __importDefault(require("path"));
function assignBundleServer(app, bundleDir) {
    console.log('Mounting bundle directory:', bundleDir);
    // Redirect root to app
    app.get('/', function (req, res) { return res.redirect('/app'); });
    // Serve index.html on root and all other paths
    app.use('/', express.static(path_1.default.resolve(bundleDir, 'index.html')));
    // Serve bundles app files
    app.use(express.static(bundleDir));
    app.use('/app', express.static(bundleDir));
    app.use('/app/*', express.static(bundleDir));
}
exports.assignBundleServer = assignBundleServer;
