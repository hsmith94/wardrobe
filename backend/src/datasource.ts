import * as mysql from 'mysql';
import { Datasource } from './datasource/datasource';
import { RetryManager } from './datasource/helpers/retry-manager';
import * as environment from './environment';

const NUM_RETRIES = 10;
const RETRY_DELAY = 1000;

let datasource: Datasource;

export async function startDatasource(): Promise<Datasource> {
    datasource = new Datasource(mysql).configure({
        host: environment.MYSQL_HOST,
        port: environment.MYSQL_PORT,
        username: environment.MYSQL_USER,
        password: environment.MYSQL_PASS,
        database: environment.MYSQL_DB,
    });

    const retryManager = new RetryManager(NUM_RETRIES, RETRY_DELAY);

    retryManager
        .retry(() => datasource.start())
        .then(() => {
            console.log(`Datasource started after ${retryManager.retries} retries`);
        });

    return datasource;
}

export const getDatasource = () => datasource;
