import { Logger } from './Logger';

/**
 * Logs on console
 */
export const ConsoleLogger: Logger = {
    /**
     * Used to log debug messages
     *
     * @param {unknown[]} data messages
     */
    debug: function (...data: unknown[]): void {        
        console.debug(...data);
    },
     /**
      * Used to log errors
      *
      * @param {unknown[]} data messages
      */
    error: function (...data: unknown[]): void {
        console.error(...data);
    },
    /**
     * Used to log useful informations
     *
     * @param {unknown[]} data messages
     */
    info: function (...data: unknown[]): void {
        console.info(...data);
    },
    /**
     * Used to log messages
     *
     * @param {unknown[]} data messages
     */
    log: function (...data: unknown[]): void {
        console.log(...data);
    },
    /**
     * Used to log a trace message
     *
     * @param {unknown[]} data messages
     */
    trace: function (...data: unknown[]): void {
        console.trace(...data);
    },
    /**
     * Used to log a warning
     *
     * @param {unknown[]} data messages
     */
    warn: function (...data: unknown[]): void {
        console.warn(...data);
    }
};