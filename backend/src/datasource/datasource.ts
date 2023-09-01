import * as mysql from 'mysql';
import { DatasourceErrors } from './datasource-errors';

export class Connection {
    constructor(private connection: mysql.Connection) {}
    public async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, results: T[]) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    }
}

export class Datasource {
    private host: string;
    private port: number;
    private username: string;
    private password: string;
    private database?: string;

    private pool: mysql.Pool;

    private isConfigured: boolean = false;
    private isStarted: boolean = false;
    private isStopped: boolean = false;

    get isReady(): boolean {
        return this.isConfigured && this.isStarted && !this.isStopped;
    }

    constructor(private mysqlClient: typeof mysql) {}

    public configure(config: {
        host: string;
        port: number;
        username: string;
        password: string;
        database?: string;
    }): this {
        if (this.isStopped) {
            throw new DatasourceErrors.DatasourceStopped();
        }
        if (this.isConfigured) {
            throw new DatasourceErrors.DatasourceAlreadyConfigured();
        }

        this.host = config.host;
        this.port = config.port;
        this.username = config.username;
        this.password = config.password;
        this.database = config.database;

        this.isConfigured = true;

        return this;
    }

    public async start(): Promise<void> {
        if (this.isStopped) {
            throw new DatasourceErrors.DatasourceStopped();
        }
        if (!this.isConfigured) {
            throw new DatasourceErrors.DatasourceNotConfigured();
        }
        if (this.isStarted) {
            throw new DatasourceErrors.DatasourceAlreadyStarted();
        }
        return new Promise((resolve, reject) => {
            const pool = this.mysqlClient.createPool({
                host: this.host,
                port: this.port,
                user: this.username,
                password: this.password,
                database: this.database,
            });

            // Check if the connection is successful
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.pool = pool;
                this.isStarted = true;
                resolve();
            });
        });
    }

    public async stop(): Promise<void> {
        if (this.isStopped) {
            throw new DatasourceErrors.DatasourceAlreadyStopped();
        }
        if (!this.isReady) {
            throw new DatasourceErrors.DatasourceNotReady();
        }
        return new Promise((resolve, reject) => {
            this.pool.end((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.pool = undefined;
                this.isStopped = true;
                resolve();
            });
        });
    }

    /**
     * @example
     *    const results = await datasource.connect(connection => {
     *       return connection.query('SELECT * FROM users');
     *    });
     */
    public async connect<T = any>(callback: (connection: Connection) => T): Promise<T> {
        if (this.isStopped) {
            throw new DatasourceErrors.DatasourceStopped();
        }
        if (!this.isReady) {
            throw new DatasourceErrors.DatasourceNotReady();
        }
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, rawConnection) => {
                try {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const connection = new Connection(rawConnection);
                    const result = callback(connection);
                    resolve(result);
                } finally {
                    rawConnection.release();
                }
            });
        });
    }
}
