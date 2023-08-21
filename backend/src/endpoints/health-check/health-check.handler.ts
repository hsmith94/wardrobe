import express from 'express';

export const handler = (req: express.Request, res: express.Response) => {
    const MESSAGE = 'Health check passed!';
    console.log(MESSAGE);
    res.status(200).send(MESSAGE);
};