export namespace ApiErrors {
    export class ApiError extends Error {
        constructor(message: string) {
            super(message);
        }
    }
    export class NotFoundError extends ApiError {
        constructor(message: string) {
            super(message);
        }
    }
}
