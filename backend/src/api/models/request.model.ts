import * as express from 'express';
import { UserId, UserInfo } from './user.model';

export type Request = express.Request & { userId: UserId; userInfo: UserInfo };
