export module ConnectionServiceTestHarness {
    export function connect(): void {
        window.dispatchEvent(new Event('online'));
    }
    export function disconnect(): void {
        window.dispatchEvent(new Event('offline'));
    }
}
