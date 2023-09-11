export type UserId = string;

export enum UserRoles {
    User = 'USER',
    Admin = 'ADMIN',
}

export type UserInfo = {
    id: string;
    name: string;
    email: string;
    picture: string;
    role: UserRoles;
};
