// TODO(hjs): Either integrate this `makeDatasourceError` concept, or remove it.
// export module DatasourceErrors2 {
//     export function makeDatasourceError(name: string) {
//         return class DatasourceError extends Error {
//             constructor(message: string) {
//                 const prototype = new.target.prototype;
//                 super(message);
//                 Object.setPrototypeOf(this, prototype);
//                 this.name = name;
//             }
//         };
//     }
//     export const DatasourceNotReadyError = makeDatasourceError('DatasourceNotReadyError');
//     export const DatasourceNotConfiguredError = makeDatasourceError('DatasourceNotConfiguredError');
//     export const DatasourceNotStartedError = makeDatasourceError('DatasourceNotStartedError');
//     export const DatasourceAlreadyConfiguredError = makeDatasourceError('DatasourceAlreadyConfiguredError');
//     export const DatasourceAlreadyStartedError = makeDatasourceError('DatasourceAlreadyStartedError');
//     export const DatasourceAlreadyStoppedError = makeDatasourceError('DatasourceAlreadyStoppedError');
// }

export module DatasourceErrors {
    export class DatasourceError extends Error {
        constructor(message: string) {
            const prototype = new.target.prototype;
            super(message);
            Object.setPrototypeOf(this, prototype);
            this.name = 'DatasourceError';
        }
    }
    export class DatasourceNotReady extends DatasourceError {
        constructor() {
            const prototype = new.target.prototype;
            super('Datasource is not ready');
            Object.setPrototypeOf(this, prototype);
            this.name = 'DatasourceNotReady';
        }
    }
    export class DatasourceNotConfigured extends DatasourceError {
        constructor() {
            const prototype = new.target.prototype;
            super('Datasource is not configured');
            Object.setPrototypeOf(this, prototype);
            this.name = 'DatasourceNotConfigured';
        }
    }
    export class DatasourceNotStarted extends DatasourceError {
        constructor() {
            const prototype = new.target.prototype;
            super('Datasource is not started');
            Object.setPrototypeOf(this, prototype);
            this.name = 'DatasourceNotStarted';
        }
    }
    export class DatasourceAlreadyConfigured extends DatasourceError {
        constructor() {
            const prototype = new.target.prototype;
            super('Datasource is already configured');
            Object.setPrototypeOf(this, prototype);
            this.name = 'DatasourceAlreadyConfigured';
        }
    }
    export class DatasourceAlreadyStarted extends DatasourceError {
        constructor() {
            const prototype = new.target.prototype;
            super('Datasource is already started');
            Object.setPrototypeOf(this, prototype);
            this.name = 'DatasourceAlreadyStarted';
        }
    }
    export class DatasourceAlreadyStopped extends DatasourceError {
        constructor() {
            const prototype = new.target.prototype;
            super('Datasource is already stopped');
            Object.setPrototypeOf(this, prototype);
            this.name = 'DatasourceAlreadyStopped';
        }
    }
    export class DatasourceStopped extends DatasourceError {
        constructor() {
            const prototype = new.target.prototype;
            super('Datasource is stopped');
            Object.setPrototypeOf(this, prototype);
            this.name = 'DatasourceStopped';
        }
    }
}
