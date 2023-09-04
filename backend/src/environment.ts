import { parseInt } from 'lodash';

export const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';

export const MYSQL_HOST: string = process.env.MYSQL_HOST || 'localhost';
export const MYSQL_PORT: number = parseInt(process.env.MYSQL_PORT) || 3306;
export const MYSQL_USER: string = process.env.MYSQL_USER || 'local';
export const MYSQL_PASS: string = process.env.MYSQL_PASS || 'local';
export const MYSQL_DB: string = process.env.MYSQL_DB || 'wardrobe_local';
