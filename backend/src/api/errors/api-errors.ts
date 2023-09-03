export namespace ApiErrors {
    export class ApiError extends Error {
        constructor(message: string) {
            const prototype = new.target.prototype;
            super(message);
            Object.setPrototypeOf(this, prototype);
            this.name = 'ApiError';
        }
    }
    export class NotFoundError extends ApiError {
        constructor(message: string) {
            const prototype = new.target.prototype;
            super(message);
            Object.setPrototypeOf(this, prototype);
            this.name = 'NotFoundError';
        }
    }
}
