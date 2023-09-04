import * as express from 'express';
import { UserId } from './user.model';

export type Request = express.Request & { userId: UserId };
