"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckEndpoint = void 0;
var HealthCheckEndpoint;
(function (HealthCheckEndpoint) {
    HealthCheckEndpoint.doHealthCheck = function (req, res) {
        var PASS_MESSAGE = 'Health check passed!';
        var FAIL_MESSAGE = 'Health check failed!';
        try {
            console.log(PASS_MESSAGE);
            res.status(200).send(PASS_MESSAGE);
        }
        catch (err) {
            console.error(FAIL_MESSAGE);
            res.status(500).send(FAIL_MESSAGE);
        }
    };
})(HealthCheckEndpoint || (exports.HealthCheckEndpoint = HealthCheckEndpoint = {}));
