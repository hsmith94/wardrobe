import { parseInt } from 'lodash';

export const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
export const MYSQL_PORT = parseInt(process.env.MYSQL_PORT) || 3306;
export const MYSQL_USER = process.env.MYSQL_USER || 'local';
export const MYSQL_PASS = process.env.MYSQL_PASS || 'local';
export const MYSQL_DB = process.env.MYSQL_DB || 'wardrobe_local';
