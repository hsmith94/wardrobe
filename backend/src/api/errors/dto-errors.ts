export namespace DtoErrors {
    export class DtoError extends Error {
        constructor(message: string) {
            super(message);
        }
    }
    export class UnknownDtoError extends DtoError {
        constructor(dto: any) {
            super(`Unknown dto ${dto}`);
        }
    }
}
