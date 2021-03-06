import Logger from './Logger';
/**
 * Used to disable logging.
 */
const NullLogger: Logger = {
	/**
	 * do nothing
	 */
	debug: function(): void {
	},
	/**
	 * do nothing
	 */
	error: function(): void {
	},
	/**
	 * do nothing
	 */
	info: function(): void {
	},
	/**
	 * do nothing
	 */
	log: function(): void {
	},
	/**
	 * do nothing
	 */
	trace: function(): void {
	},
	/**
	 * do nothing
	 */
	warn: function(): void {
	}
};

export default NullLogger;