import { SubscribeOptions } from './options/SubscribeOptions';
import { ListenerFunction } from './ListenerFunction';
import { Logger } from './utilities/Logger';
import { EventListenerOptions } from './options/EventListenerOptions';
import { UnsubscribeOptions } from './options/UnsubscribeOptions';
import { SubscribeWithKeyOptions } from './options/SubscribeWithKeyOptions';
import { UnsubscribeWithKeyOptions } from './options/UnsubscribeWithKeyOptions';
import { WaitUntilFirstDispatchOptions } from './options/WaitUntilFirstDispatchOptions';
import { DispatchOptions } from './DispatchOptions';
/**
 * @author Stefano Balzarotti
 * @copyright OrbintSoft
 * Simple event listener.
 */
export declare class OSEventListener {
    #private;
    /**
     * @returns {string} The event name
     */
    get name(): string;
    /**
     * @returns {Logger} The internal logger
     */
    protected get logger(): Logger;
    /**
     * @param {string} name the name of the event
     * @param {EventListenerOptions} [options=DefaultEventListenerOptions] settings
     */
    constructor(name: string, options?: EventListenerOptions);
    /**
     * @param {ListenerFunction} fn the function you want subscribe to the event
     * @param {SubscribeOptions} [options=DefaultSubscribeOptions] settings
     * @returns {boolean} function successfully subscribed
     */
    subscribe(fn: ListenerFunction, options?: SubscribeOptions): boolean;
    /**
     * @param {ListenerFunction} fn the function you want unsubscribe from the event
     * @param {UnsubscribeOptions} [options=DefaultUnsubscribeOptions] settings
     * @returns {boolean} function successfully unsubscribed
     */
    unsubscribe(fn: ListenerFunction, options?: UnsubscribeOptions): boolean;
    /**
     * Resets the first dispatch status
     */
    resetFirstDispatch(): void;
    /**
     * Dispatch the event
     *
     * @param {unknown} sender who is dispatching the event
     * @param {unknown} data payload
     * @param {DispatchOptions} [options=DefaultDispatchOptions] settings
     */
    dispatch(sender: unknown, data: unknown, options?: DispatchOptions): void;
    /**
     * @param {WaitUntilFirstDispatchOptions} options settings
     * @returns {Promise<unknown>} payload data
     */
    waitUntilFirstDispatchAsync(options?: WaitUntilFirstDispatchOptions): Promise<unknown>;
    /**
     * @param {ListenerFunction} fn the function to subscribe
     * @param {string} key the key to be used fir subscribe
     * @param {SubscribeWithKeyOptions} [options = DefaultSubscribeWithKeyOptions] settings
     * @returns {boolean} if subscribed successfully
     */
    subscribeWithKey(fn: ListenerFunction, key: string, options?: SubscribeWithKeyOptions): boolean;
    /**
     * @param {string} key the key to use for unsubscribe
     * @param {UnsubscribeWithKeyOptions} [options = DefaultUnsubscribeWithKeyOptions] settings
     * @returns {boolean} if unsubscribed successfully
     */
    unsubscribeWithKey(key: string, options?: UnsubscribeWithKeyOptions): boolean;
}
