import { noop } from 'lodash';
import * as mysql from 'mysql';
import { Connection, Datasource } from './datasource';
import { DatasourceErrors } from './datasource-errors';

describe('Datasource', () => {
    let mockConnection: mysql.Connection;
    let mockPool: mysql.Pool;
    let mockMysqlClient: typeof mysql;
    let datasource: Datasource;

    beforeEach(() => {
        mockConnection = {
            query: jest.fn((sql, params, callback) => callback(null, [])),
        } as any;
        mockPool = {
            getConnection: jest.fn((callback) => {
                callback(null, mockConnection as any);
            }),
            end: jest.fn((callback) => {
                callback(null);
            }),
        } as any;
        mockMysqlClient = {
            createPool: jest.fn(() => mockPool),
        } as any;
        datasource = new Datasource(mockMysqlClient);
    });

    describe('configure', () => {
        it('should set the datasource configuration', () => {
            // Arrange
            const host = 'localhost';
            const port = 3306;
            const username = 'root';
            const password = 'password';
            const database = 'test_db';

            // Act
            datasource.configure({ host, port, username, password, database });

            // Assert
            expect(datasource['host']).toEqual(host);
            expect(datasource['port']).toEqual(port);
            expect(datasource['username']).toEqual(username);
            expect(datasource['password']).toEqual(password);
            expect(datasource['database']).toEqual(database);
            expect(datasource['isConfigured']).toBeTruthy();
        });
    });

    describe('start', () => {
        it('should start the datasource', async () => {
            // Arrange
            const host = 'localhost';
            const port = 3306;
            const username = 'root';
            const password = 'password';
            const database = 'test_db';
            datasource.configure({ host, port, username, password, database });

            // Act
            await datasource.start();

            // Assert
            expect(mockPool.getConnection).toHaveBeenCalled();
            expect(datasource['isStarted']).toBeTruthy();
        });

        it('should throw an error if datasource is not configured', async () => {
            // Act & Assert
            await expect(datasource.start()).rejects.toThrow(DatasourceErrors.DatasourceError);
        });
    });

    describe('stop', () => {
        it('should stop the datasource', async () => {
            // Arrange
            const host = 'localhost';
            const port = 3306;
            const username = 'root';
            const password = 'password';
            const database = 'test_db';
            datasource.configure({ host, port, username, password, database });
            await datasource.start();

            // Act
            await datasource.stop();

            // Assert
            expect(mockPool.end).toHaveBeenCalled();
            expect(datasource['isStopped']).toBeTruthy();
        });

        it('should throw an error if datasource is not started', async () => {
            // Arrange
            const host = 'localhost';
            const port = 3306;
            const username = 'root';
            const password = 'password';
            const database = 'test_db';
            datasource.configure({ host, port, username, password, database });

            // Act & Assert
            await expect(datasource.stop()).rejects.toThrow(DatasourceErrors.DatasourceError);
        });
    });

    describe('getConnection', () => {
        it('should return a connection', async () => {
            // Arrange
            const host = 'localhost';
            const port = 3306;
            const username = 'root';
            const password = 'password';
            const database = 'test_db';
            datasource.configure({ host, port, username, password, database });
            await datasource.start();

            const mockConnection = {} as mysql.Connection;
            mockPool.getConnection = jest.fn((callback) => {
                callback(null, mockConnection as any);
            });
            const expectedConnection = new Connection(mockConnection);

            // Act
            const callback = jest.fn();
            await datasource.connect(callback);

            // Assert
            expect(callback).toBeCalledWith(expectedConnection);
        });

        it('should throw an error if datasource is not started', async () => {
            // Arrange
            const host = 'localhost';
            const port = 3306;
            const username = 'root';
            const password = 'password';
            const database = 'test_db';
            datasource.configure({ host, port, username, password, database });

            // Act & Assert
            await expect(datasource.connect(noop)).rejects.toThrow(DatasourceErrors.DatasourceError);
        });
    });
});
