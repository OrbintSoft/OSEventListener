/// <amd-module name="utilities/Logger"/>
/**
 * An interface to log messages
 */
export interface Logger {
	/**
	 * Used to log debug messages
	 *
	 * @param {unknown[]} data messages
	 */
	debug(...data: unknown[]): void;
	/**
	 * Used to log errors
	 *
	 * @param {unknown[]} data messages
	 */
	error(...data: unknown[]): void;
	/**
	 * Used to log useful informations
	 *
	 * @param {unknown[]} data messages
	 */
	info(...data: unknown[]): void;
	/**
	 * Used to log messages
	 *
	 * @param {unknown[]} data messages
	 */
	log(...data: unknown[]): void;
	/**
	 * Used to log a trace message
	 *
	 * @param {unknown[]} data messages
	 */
	trace(...data: unknown[]): void;
	/**
	 * Used to log a warning
	 *
	 * @param {unknown[]} data messages
	 */
	warn(...data: unknown[]): void;
}