export const setTimeoutPromise = <T>(fn: () => T, delay: number): Promise<T> => {
    return new Promise((resolve) => setTimeout(() => resolve(fn()), delay));
};
