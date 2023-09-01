import * as express from 'express';
import { UserId } from '../models/user.model';

export type Request = express.Request & { userId: UserId };
