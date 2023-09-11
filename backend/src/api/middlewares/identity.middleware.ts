import express from 'express';
import { Request } from '../models/request.model';
import { UserId, UserInfo, UserRoles } from '../models/user.model';

const TEST_USER_ID = 'HARRY';

const TEST_DEFAULT_USER_PICTURE_URL =
    'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg';

const TEST_USERS: { [userId: string]: UserInfo } = {
    HARRY: {
        id: 'HARRY',
        name: 'Harry Smith',
        email: 'harry.smith@example.com',
        picture: TEST_DEFAULT_USER_PICTURE_URL,
        role: UserRoles.Admin,
    },
    LENA: {
        id: 'LENA',
        name: 'Lena Drotleff',
        email: 'lena.drotleff@example.com',
        picture: TEST_DEFAULT_USER_PICTURE_URL,
        role: UserRoles.User,
    },
};

function getUserId(req: Request): UserId | undefined {
    return TEST_USER_ID;
}

async function getUserInfo(userId: UserId): Promise<UserInfo | undefined> {
    return TEST_USERS[userId];
}

export async function IdentityMiddleware(
    req: Request,
    res: express.Response,
    next: express.NextFunction,
): Promise<void> {
    console.log('IdentityMiddleware');

    const userId = getUserId(req);
    req.userId = userId;
    req.userInfo = await getUserInfo(userId);

    next();
}
