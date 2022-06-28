import DefaultSubscribeOptions from './options/DefaultSubscribeOptions';
import SubscribeOptions from './options/SubscribeOptions';
import ListenerFunction from './ListenerFunction';
import Logger from './utilities/Logger';
import EventListenerOptions from './options/EventListenerOptions';
import DefaultEventListenerOptions from './options/DefaultEventListenerOptions';
import UnsubscribeOptions from './options/UnsubscribeOptions';
import DefaultUnsubscribeOptions from './options/DefaultUnsubscribeOptions';
import NullLogger from './utilities/NullLogger';
import SubscribeWithKeyOptions from './options/SubscribeWithKeyOptions';
import OptionsMapper from './options/OptionsMapper';
import DefaultSubscribeWithKeyOptions from './options/DefaultSubscribeWithKeyOptions';
import UnsubscribeWithKeyOptions from './options/UnsubscribeWithKeyOptions';
import DefaultUnsubscribeWithKeyOptions from './options/DefaultUnsubscribeWithKeyOptions';
import DefaultDispatchOptions from './options/DefaultDispatchOptions';
import WaitUntilFirstDispatchOptions from './options/WaitUntilFirstDispatchOptions';
import DefaultWaitUntilFirstDispatchOptions from './options/DefaultWaitUntilFirstDispatchOptions';
import DispatchOptions from './options/DispatchOptions';

/**
 * @author Stefano Balzarotti
 * @copyright OrbintSoft
 * Simple event listener.
 */
export default class OSEventListener {    
	#name  = '';
	#listeners: ListenerFunction[] = [];
	#logger: Logger = NullLogger;
	#firstDispatchOccurred = false;
	#keyMappedListeners: Map<string, ListenerFunction[]> = new Map(); 
	#latestData: unknown = null;

	/**
	 * @returns {string} The event name
	 */
	get name(): string {
		return this.#name;
	}

	/**
	 * @returns {Logger} The internal logger
	 */
	protected get logger(): Logger {
		return this.#logger;
	}

	/**
	 * @param {string} name the name of the event 
	 * @param {EventListenerOptions} [options=DefaultEventListenerOptions] settings
	 */
	constructor(name: string, options: EventListenerOptions = DefaultEventListenerOptions){
		options = OptionsMapper.map(options, DefaultEventListenerOptions);
		this.#logger = options.logger; 
		this.#name = name;
	}

	/**
	 * @param {ListenerFunction} fn the function you want subscribe to the event
	 * @param {SubscribeOptions} [options=DefaultSubscribeOptions] settings
	 * @returns {boolean} function successfully subscribed
	 */
	subscribe(fn: ListenerFunction, options: SubscribeOptions = DefaultSubscribeOptions): boolean {
		options = OptionsMapper.map(options, DefaultSubscribeOptions);
		if (!this.#listeners.includes(fn) || options.allowMultipleSubscribeSameFunction){
			this.#listeners.push(fn);
			return true;
		} else {
			const errorMessage = 'An attempt to subscribe multiple times the same function occurred';
			if (options.shouldThrowErrors){
				throw new Error(errorMessage);                
			} else {
				this.#logger.warn(errorMessage);
				return false;
			}
		}
	}

	/**
	 * Removes a function from the key map
	 *
	 * @param {ListenerFunction} fn listener
	 * @param {UnsubscribeOptions} options settings
	 */
	#removeFunctionFromKeyMap(fn: ListenerFunction, options: UnsubscribeOptions){
		if (typeof (fn._keyedOsEvent) === 'string'){
			const possibleFns = this.#keyMappedListeners.get(fn._keyedOsEvent);
			if (possibleFns){
				let i = -1;
				do {
					i = possibleFns.indexOf(fn);
					if (i!== -1){
						possibleFns.splice(i, 1);
					}   
					if (options.removeOnlyFirstOccurrence){
						break;
					}                             
				} while (i !== -1);   
			}             
		}
	}


	/**
	 * @param {ListenerFunction} fn the function you want unsubscribe from the event
	 * @param {UnsubscribeOptions} [options=DefaultUnsubscribeOptions] settings
	 * @returns {boolean} function successfully unsubscribed
	 */
	unsubscribe(fn: ListenerFunction, options: UnsubscribeOptions = DefaultUnsubscribeOptions): boolean {
		options = OptionsMapper.map(options, DefaultUnsubscribeOptions);
		let i = -1;
		let found = false;
		do {
			i = this.#listeners.indexOf(fn);
			if (i !== -1) {
				this.#listeners.splice(i, 1);
				found = true;
			}
			if (options.removeOnlyFirstOccurrence) {
				break;
			}
		} while (i !== -1);
		if (found){
			this.#removeFunctionFromKeyMap(fn, options);
			return true;
		} else {
			const errorMessage = 'An attempt to unsubscribe a non subscribed function occurred';
			if (options.shouldThrowErrors){
				throw new Error(errorMessage);                
			} else {
				this.#logger.warn(errorMessage);
				return false;
			}
		}        
	}

	/**
	 * Resets the first dispatch status
	 */
	resetFirstDispatch(){
		this.#firstDispatchOccurred = false;
	}

	/**
	 * Dispatch the event
	 *
	 * @param {unknown} sender who is dispatching the event
	 * @param {unknown} data payload
	 * @param {DispatchOptions} [options=DefaultDispatchOptions] settings
	 */
	dispatch(sender: unknown, data: unknown, options: Partial<DispatchOptions> = DefaultDispatchOptions){
		const newOptions = OptionsMapper.map(options, DefaultDispatchOptions);
		if (newOptions.storeData){
			this.#latestData = data;
		}
		this.#firstDispatchOccurred = true;
		for (const f of this.#listeners){
			try {
				if (newOptions.defer){
					setTimeout(() => {
						f(sender, data);
					}, 0);
				} else {
					f(sender, data);
				}
				
			} catch (ex){
				if (newOptions.shouldThrowErrors) {
					throw ex;
				} else {
					this.#logger.error(ex);
				}				
			}
		}
	}

	/**
	 * @param {WaitUntilFirstDispatchOptions} options settings
	 * @returns {Promise<unknown>} payload data
	 */
	waitUntilFirstDispatchAsync(options: WaitUntilFirstDispatchOptions = DefaultWaitUntilFirstDispatchOptions): Promise<unknown> {        
		const myself = this;
		options = OptionsMapper.map(options, DefaultWaitUntilFirstDispatchOptions);
		if (options.resetFirstDispatchBefore){
			this.resetFirstDispatch();
		}
		if (this.#firstDispatchOccurred){
			if (options.resetFirstDispatchAfter){
				this.resetFirstDispatch();
			}
			return Promise.resolve(this.#latestData);
		} else {
			let listener: ListenerFunction;
			
			const promise = new Promise<unknown>((resolve, reject) => {
				listener = (sender, data) => {
					myself.unsubscribe(listener);
					if (options.resetFirstDispatchAfter){
						myself.resetFirstDispatch();
					}
					resolve(data);
				};
				if (!myself.subscribe(listener)){
					reject();
				}                                
			});
			return promise;
		}
	}

	/**
	 * @param {ListenerFunction} fn the function to subscribe
	 * @param {string} key the key to be used fir subscribe
	 * @param {SubscribeWithKeyOptions} [options = DefaultSubscribeWithKeyOptions] settings
	 * @returns {boolean} if subscribed successfully
	 */
	subscribeWithKey(fn: ListenerFunction, key: string, options: SubscribeWithKeyOptions = DefaultSubscribeWithKeyOptions): boolean{
		options = OptionsMapper.map(options, DefaultSubscribeWithKeyOptions);
		const mappedListeners = this.#keyMappedListeners.get(key) || [];
		if (mappedListeners.length === 0 || options.allowMultipleListernersPerKey){
			mappedListeners.push(fn);
		} else {
			const errorMessage = 'An attempt to add a listener with same key occurred';
			if (options.shouldThrowErrors){
				throw Error(errorMessage);
			} else {
				this.#logger.error(errorMessage);
				return false;
			}
		}

		this.#keyMappedListeners.set(key, mappedListeners);
		return this.subscribe(fn);
	}

	/**
	 * @param {string} key the key to use for unsubscribe
	 * @param {UnsubscribeWithKeyOptions} [options = DefaultUnsubscribeWithKeyOptions] settings
	 * @returns {boolean} if unsubscribed successfully
	 */
	unsubscribeWithKey(key: string, options: UnsubscribeWithKeyOptions = DefaultUnsubscribeWithKeyOptions): boolean{
		const mappedListeners = this.#keyMappedListeners.get(key) || [];
		let found = false;
		for (const fn of mappedListeners){            
			this.unsubscribe(fn, options);
			found = true;            
			if (options.removeOnlyFirstKeyedListener){
				break;   
			}
		}     
		if (!found){
			const errorMessage = 'An attempt to unsubscribe a non mapped listener occurred';
			if (options.shouldThrowErrors){
				throw Error(errorMessage);
			} else {
				this.#logger.warn(errorMessage);
			}
		}   
		return found;
	}    
}