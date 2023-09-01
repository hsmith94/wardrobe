import * as mysql from 'mysql';
import { Datasource } from './datasource/datasource';
import * as environment from './environment';

export async function startDatasource(): Promise<Datasource> {
    const datasource = new Datasource(mysql).configure({
        host: environment.MYSQL_HOST,
        port: environment.MYSQL_PORT,
        username: environment.MYSQL_USER,
        password: environment.MYSQL_PASS,
        database: environment.MYSQL_DB,
    });

    await datasource.start();

    return datasource;
}
