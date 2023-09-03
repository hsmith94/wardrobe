import express from 'express';

export module HealthCheckEndpoint {
    export const doHealthCheck = (req: express.Request, res: express.Response) => {
        const PASS_MESSAGE = 'Health check passed!';
        const FAIL_MESSAGE = 'Health check failed!';
        try {
            console.log(PASS_MESSAGE);
            res.status(200).send(PASS_MESSAGE);
        } catch (err) {
            console.error(FAIL_MESSAGE);
            res.status(500).send(FAIL_MESSAGE);
        }
    };
}
