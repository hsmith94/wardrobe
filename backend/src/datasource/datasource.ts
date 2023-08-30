import * as mysql from 'mysql';

export namespace Errors {
    export class DatasourceError extends Error {
        constructor(message: string) {
            super(message);
        }
    }
    export class DatasourceNotReady extends DatasourceError {
        constructor() {
            super('Datasource is not ready');
        }
    }
    export class DatasourceNotConfigured extends DatasourceError {
        constructor() {
            super('Datasource is not configured');
        }
    }
    export class DatasourceNotStarted extends DatasourceError {
        constructor() {
            super('Datasource is not started');
        }
    }
    export class DatasourceAlreadyConfigured extends DatasourceError {
        constructor() {
            super('Datasource is already configured');
        }
    }
    export class DatasourceAlreadyStarted extends DatasourceError {
        constructor() {
            super('Datasource is already started');
        }
    }
    export class DatasourceAlreadyStopped extends DatasourceError {
        constructor() {
            super('Datasource is already stopped');
        }
    }
    export class DatasourceStopped extends DatasourceError {
        constructor() {
            super('Datasource is stopped');
        }
    }
}

export class Connection {
    constructor(private connection: mysql.Connection) {}
    public async query(sql: string, params?: any[]): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, results) => {
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

    public configure(host: string, port: number, username: string, password: string, database?: string): this {
        if (this.isStopped) {
            throw new Errors.DatasourceStopped();
        }
        if (this.isConfigured) {
            throw new Errors.DatasourceAlreadyConfigured();
        }

        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.database = database;

        this.isConfigured = true;

        return this;
    }

    public async start(): Promise<void> {
        if (this.isStopped) {
            throw new Errors.DatasourceStopped();
        }
        if (!this.isConfigured) {
            throw new Errors.DatasourceNotConfigured();
        }
        if (this.isStarted) {
            throw new Errors.DatasourceAlreadyStarted();
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
            throw new Errors.DatasourceAlreadyStopped();
        }
        if (!this.isReady) {
            throw new Errors.DatasourceNotReady();
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
    public async connect(callback: (connection: Connection) => void): Promise<void> {
        if (this.isStopped) {
            throw new Errors.DatasourceStopped();
        }
        if (!this.isReady) {
            throw new Errors.DatasourceNotReady();
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
