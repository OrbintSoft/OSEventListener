/**
 * An interface to log messages
 */
export interface Logger {
    debug(...data: unknown[]): void;
    error(...data: unknown[]): void;
    info(...data: unknown[]): void;
    log(...data: unknown[]): void;
    trace(...data: unknown[]): void;
    warn(...data: unknown[]): void;
}