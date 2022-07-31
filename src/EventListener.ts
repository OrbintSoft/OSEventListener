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
import ListenerWrapper from './ListenerWrapper';
import DefaultBindToEventOptions from './options/DefaultBindToEventOptions';
import BindToEventOptions from './options/BindToEventOptions';
import UnbindFromEventOptions from './options/UnbindFromEventOptions';
import DefaultUnbindToEventOptions from './options/DefaultUnbindFromEventOptions';

/**
 * @author Stefano Balzarotti
 * @copyright OrbintSoft
 * Simple event listener.
 */
export default class EventListener {
	#name  = '';
	#listeners: ListenerWrapper[] = [];
	#logger: Logger = NullLogger;
	#firstDispatchOccurred = false;
	#keyMappedListeners: Map<string, ListenerWrapper[]> = new Map();
	#latestData: unknown = null;
	#bindedEvents: Map<EventListener, ListenerFunction> = new Map();
	#attachedEvents: EventListener[] = [];

	/**
	 * @returns {string} The event name
	 */
	get name(): string {
		return this.#name;
	}

	/**
	 * @param {string} name the name of the event
	 * @param {Partial<EventListenerOptions>} [options=DefaultEventListenerOptions] settings
	 */
	constructor(name: string, options: Partial<EventListenerOptions> = DefaultEventListenerOptions) {
		const newOptions = OptionsMapper.map(options, DefaultEventListenerOptions);
		this.#logger = newOptions.logger;
		this.#name = name;
	}

	/**
	 * @param {ListenerWrapper} wrapper the function you want subscribe to the event with options
	 * @param {SubscribeOptions} [options=DefaultSubscribeOptions] settings
	 * @returns {boolean} function successfully subscribed
	 */
	#subscribe(wrapper: ListenerWrapper, options: SubscribeOptions): boolean {
		const newOptions = OptionsMapper.map(options, DefaultSubscribeOptions);
		if (!this.#listeners.some((w) => w.fn === wrapper.fn) || newOptions.allowMultipleSubscribeSameFunction) {
			const last = this.#listeners.length > 0 ? this.#listeners[this.#listeners.length - 1] : wrapper;
			this.#listeners.push(wrapper);
			if (this.#listeners[0].priority !== null || last.priority !== null || wrapper.priority !== null) {
				this.#listeners.sort((a, b) => (b.priority === null ? 0 : b.priority) - (a.priority === null ? 0 : a.priority));
			}
			return true;
		} else {
			const errorMessage = 'An attempt to subscribe multiple times the same function occurred';
			if (newOptions.shouldThrowErrors) {
				throw new Error(errorMessage);
			} else {
				this.#logger.warn(errorMessage);
				return false;
			}
		}
	}

	/**
	 * @param {ListenerFunction} fn the function you want subscribe to the event
	 * @param {SubscribeOptions} [options=DefaultSubscribeOptions] settings
	 * @returns {boolean} function successfully subscribed
	 */
	subscribe(fn: ListenerFunction, options: Partial<SubscribeOptions> = DefaultSubscribeOptions): boolean {
		const newOptions = OptionsMapper.map(options, DefaultSubscribeOptions);
		const wrapper = new ListenerWrapper(fn, null, newOptions.priority);
		return this.#subscribe(wrapper, newOptions);
	}

	/**
	 * Removes a function from the key map
	 *
	 * @param {ListenerWrapper} wrapper listener wrapper
	 * @param {UnsubscribeOptions} options settings
	 */
	#removeFunctionFromKeyMap(wrapper: ListenerWrapper, options: UnsubscribeOptions) {
		if (wrapper.keyedEvent !== null) {
			const possibleFns = this.#keyMappedListeners.get(wrapper.keyedEvent);
			if (possibleFns) {
				let i = -1;
				do {
					i = possibleFns.findIndex(w => w.fn === wrapper.fn);
					if (i !== -1) {
						possibleFns.splice(i, 1);
					}
					if (options.removeOnlyFirstOccurrence) {
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
	unsubscribe(fn: ListenerFunction, options: Partial<UnsubscribeOptions> = DefaultUnsubscribeOptions): boolean {
		const newOptions = OptionsMapper.map(options, DefaultUnsubscribeOptions);
		let i = -1;
		let found = false;
		let wrapper: ListenerWrapper | null = null;
		do {
			i = this.#listeners.findIndex(w => w.fn === fn);
			if (i !== -1) {
				wrapper = this.#listeners.splice(i, 1)[0];
				found = true;
			}
			if (newOptions.removeOnlyFirstOccurrence) {
				break;
			}
		} while (i !== -1);
		if (found) {
			this.#removeFunctionFromKeyMap(wrapper as ListenerWrapper, newOptions);
			return true;
		} else {
			const errorMessage = 'An attempt to unsubscribe a non subscribed function occurred';
			if (newOptions.shouldThrowErrors) {
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
	resetFirstDispatch() {
		this.#firstDispatchOccurred = false;
	}

	/**
	 * Dispatch the event
	 *
	 * @param {unknown} sender who is dispatching the event
	 * @param {unknown} data payload
	 * @param {DispatchOptions} [options=DefaultDispatchOptions] settings
	 */
	dispatch(sender: unknown, data: unknown, options: Partial<DispatchOptions> = DefaultDispatchOptions) {
		const newOptions = OptionsMapper.map(options, DefaultDispatchOptions);
		if (newOptions.storeData) {
			this.#latestData = data;
		}
		this.#firstDispatchOccurred = true;
		for (const w of this.#listeners) {
			try {
				if (newOptions.defer) {
					setTimeout(() => {
						w.fn(sender, data);
					}, 0);
				} else {
					w.fn(sender, data);
				}

			} catch (ex) {
				if (newOptions.shouldThrowErrors) {
					throw ex;
				} else {
					this.#logger.error(ex);
				}
			}
		}
		this.#dispatchAttachedEvents(sender, data, newOptions);
	}

	/**
	 * Internal method to dispatch the event to attached events.
	 *
	 * @param {unknown} sender the original sender.
	 * @param {unknown} data the data to propagate.
	 * @param {DispatchOptions} options option settings.
	 */
	#dispatchAttachedEvents(sender: unknown, data: unknown, options: DispatchOptions) {
		for (const e of this.#attachedEvents) {
			e.dispatch({
				actual: this,
				original: sender
			}, data, options);
		}
	}

	/**
	 * @param {WaitUntilFirstDispatchOptions} options settings
	 * @returns {Promise<unknown>} payload data
	 */
	waitUntilFirstDispatchAsync(options: WaitUntilFirstDispatchOptions = DefaultWaitUntilFirstDispatchOptions): Promise<unknown> {
		const myself = this;
		options = OptionsMapper.map(options, DefaultWaitUntilFirstDispatchOptions);
		if (options.resetFirstDispatchBefore) {
			this.resetFirstDispatch();
		}
		if (this.#firstDispatchOccurred) {
			if (options.resetFirstDispatchAfter) {
				this.resetFirstDispatch();
			}
			return Promise.resolve(this.#latestData);
		} else {
			let listener: ListenerFunction;
			const promise = new Promise<unknown>((resolve, reject) => {
				listener = (sender, data) => {
					myself.unsubscribe(listener);
					promise.then(() => {
						if (options.resetFirstDispatchAfter) {
							myself.resetFirstDispatch();
						}
					});
					resolve(data);
				};
				if (!myself.subscribe(listener)) {
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
	subscribeWithKey(fn: ListenerFunction, key: string, options: Partial<SubscribeWithKeyOptions> = DefaultSubscribeWithKeyOptions): boolean {
		const newOptions = OptionsMapper.map(options, DefaultSubscribeWithKeyOptions);
		const mappedListeners = this.#keyMappedListeners.get(key) || [];
		if (mappedListeners.length === 0 || newOptions.allowMultipleListernersPerKey) {
			const wrapper = new ListenerWrapper(fn, key, options.priority);
			mappedListeners.push(wrapper);
			this.#keyMappedListeners.set(key, mappedListeners);
			return this.#subscribe(wrapper, newOptions);
		} else {
			const errorMessage = 'An attempt to add a listener with same key occurred';
			if (newOptions.shouldThrowErrors) {
				throw Error(errorMessage);
			} else {
				this.#logger.error(errorMessage);
				return false;
			}
		}
	}

	/**
	 * @param {string} key the key to use for unsubscribe
	 * @param {UnsubscribeWithKeyOptions} [options = DefaultUnsubscribeWithKeyOptions] settings
	 * @returns {boolean} if unsubscribed successfully
	 */
	unsubscribeWithKey(key: string, options: Partial<UnsubscribeWithKeyOptions> = DefaultUnsubscribeWithKeyOptions): boolean {
		const newOptions = OptionsMapper.map(options, DefaultUnsubscribeWithKeyOptions);
		const mappedListeners = this.#keyMappedListeners.get(key) || [];
		let found = false;
		while (mappedListeners.length > 0) {
			const w = mappedListeners.pop() as ListenerWrapper;
			if (this.unsubscribe(w.fn, newOptions)) {
				found = true;
			} else {
				this.#logger.warn('Failed to unsubscribe a registered function, probably it was already unsubscribed');
			}
			if (newOptions.removeOnlyFirstKeyedListener) {
				break;
			}
		}
		if (!found) {
			const errorMessage = 'An attempt to unsubscribe a non mapped listener occurred';
			if (newOptions.shouldThrowErrors) {
				throw Error(errorMessage);
			} else {
				this.#logger.warn(errorMessage);
			}
		}
		this.#keyMappedListeners.set(key, mappedListeners);
		return found;
	}

	/**
	 * @param {EventListener} event the event you want to bind.
	 * @param {Partial<BindToEventOptions>} options option settings.
	 * @returns {boolean} true if binded successfully.
	 */
	bindToEvent(event: EventListener, options: Partial<BindToEventOptions> = DefaultBindToEventOptions): boolean {
		const newOptions = OptionsMapper.map(options, DefaultBindToEventOptions);
		if (event === this) {
			const errorMessage = 'Cannot bind event with itself!';
			if (newOptions.shouldThrowErrors) {
				throw Error(errorMessage);
			}
			this.#logger.error(errorMessage);
			return false;
		}
		if (this.#bindedEvents.has(event)) {
			const errorMessage = `The event ${this.name} is already binded to the event ${event.name}`;
			if (newOptions.shouldThrowErrors) {
				throw Error(errorMessage);
			}
			this.#logger.error(errorMessage);
			return false;
		} else {
			const fn = (sender: unknown, data: unknown) => {
				this.dispatch({
					actual: this,
					original: sender
				}, data, {
					defer: newOptions.defer,
					shouldThrowErrors: newOptions.shouldThrowErrors,
					storeData: newOptions.storeData
				});
			};
			this.#bindedEvents.set(event, fn);
			return event.subscribe(fn, {
				priority: newOptions.priority,
				shouldThrowErrors: newOptions.shouldThrowErrors
			});
		}
	}

	/**
	 * @param {EventListener} event the event you want to unbind.
	 * @param {Partial<UnbindFromEventOptions>} options option settings.
	 * @returns {boolean} true if unbinded successfully.
	 */
	unbindFromEvent(event: EventListener, options: Partial<UnbindFromEventOptions> = DefaultUnsubscribeOptions): boolean {
		const newOptions = OptionsMapper.map<UnbindFromEventOptions>(options, DefaultUnbindToEventOptions);
		const fn = this.#bindedEvents.get(event);
		if (fn) {
			let result = event.unsubscribe(fn, newOptions);
			result &&= this.#bindedEvents.delete(event);
			return result;
		} else {
			const warningMessage = `No binded event ${event.name} found`;
			if (newOptions.shouldThrowErrors) {
				throw Error(warningMessage);
			} else {
				this.#logger.warn(warningMessage);
				return false;
			}
		}
	}

	/**
	 * You can attach an event, so everytime you dispatch an event it will also dispatch to the attached event.
	 * Attached event are always dispatched after this event.
	 *
	 * @param {EventListener} event the event you want to attach
	 * @returns {boolean} true if attached successfully
	 */
	attachEvent(event: EventListener): boolean {
		if (event !== this) {
			if (!this.#attachedEvents.includes(event)) {
				this.#attachedEvents.push(event);
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	/**
	 * Detaches an attached event.
	 *
	 * @param {EventListener} event the event you want to attach
	 * @returns {boolean} true if detached successfully
	 */
	detachEvent(event: EventListener): boolean {
		if (event !== this) {
			const i = this.#attachedEvents.indexOf(event);
			if (i >= 0) {
				this.#attachedEvents.splice(i, 1);
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}