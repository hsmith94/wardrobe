export namespace HttpErrors {
    export class HttpError extends Error {
        constructor(message: string) {
            const prototype = new.target.prototype;
            super(message);
            Object.setPrototypeOf(this, prototype);
            this.name = 'HttpError';
        }
    }
    export class NotFoundError extends HttpError {
        constructor(message: string) {
            const prototype = new.target.prototype;
            super(message);
            Object.setPrototypeOf(this, prototype);
            this.name = 'NotFoundError';
        }
    }
}
