import { setTimeoutPromise } from './set-timeout-promise';

export class RetryManager {
    private _retries = 0;

    constructor(private maxRetries: number, private delay: number) {}

    public get retries(): number {
        return this._retries;
    }

    public async retry<T>(fn: () => Promise<T>): Promise<T> {
        try {
            return await fn();
        } catch (err) {
            if (this._retries >= this.maxRetries) {
                throw err;
            }
            this._retries++;
            return await setTimeoutPromise(() => this.retry(fn), this.delay);
        }
    }
}
