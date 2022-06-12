import { ErrorThrowable } from './ErrorThrowable';

/**
 * Sets the options settings for subscribe.
 */
export interface SubscribeOptions extends ErrorThrowable {
	/**
	 * allows to subscribe multiple times the same function
	 */
	allowMultipleSubscribeSameFunction: boolean
}