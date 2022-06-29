import ListenerFunction from './ListenerFunction';

/**
 * It wraps a Listener function, it's for internal use
 */
export default class ListenerWrapper {
	fn: ListenerFunction;
	keyedEvent: string|null;
	priority: number|null;

	/**
	 * @param {ListenerFunction} fn The listener function 
	 * @param {string|null} keyedEvent The key associated with this event
	 * @param {number|null} prority The priority
	 */
	constructor(fn: ListenerFunction, keyedEvent: string|null = null, prority: number| null = null) {
		this.fn = fn;
		this.keyedEvent = keyedEvent;
		this.priority = prority;
	}
} 