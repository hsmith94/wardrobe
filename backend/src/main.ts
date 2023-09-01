import { API_PORT, APP_NAME } from './constants';
import { startDatasource } from './datasource';
import { startServer } from './server';

async function main() {
    try {
        await startDatasource();
        await startServer().then(() => {
            console.log(`${APP_NAME} listening on port: ${API_PORT}`);
        });
    } catch (err) {
        console.error(`FATAL: ${err.message}\n\n${err.stack}`);
        process.exit(1);
    }
}

main();
