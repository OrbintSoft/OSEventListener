import Logger from '../utilities/Logger';
import NullLogger from '../utilities/NullLogger';
import EventListenerOptions from './EventListenerOptions';
/**
 * Default settings for event listener options
 */
const DefaultEventListenerOptions: EventListenerOptions = {
	/**
	 * console is used as default logger if available
	 *
	 * @returns  {Logger} Logger
	 */
	get logger(): Logger {
		return console ?? NullLogger;
	}
};

export default DefaultEventListenerOptions;