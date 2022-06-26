import NullLogger from '../utilities/NullLogger';
import EventListenerOptions from './EventListenerOptions';
/// <amd-module name="options/DefaultEventListenerOptions"/>
/**
 * Default settings for event listener options
 */
const DefaultEventListenerOptions: EventListenerOptions = {
	/**
	 * console is used as default logger if available
	 */
	logger: console ?? NullLogger
};

export default DefaultEventListenerOptions;