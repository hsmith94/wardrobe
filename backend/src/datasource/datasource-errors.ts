export module DatasourceErrors {
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
