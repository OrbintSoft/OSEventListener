import { UnsubscribeOptions } from './UnsubscribeOptions';

/**
 * Option settings for Unsubscribe with key.
 */
export interface UnsubscribeWithKeyOptions extends UnsubscribeOptions {
	/**
	 * If enabled it removed only the first listener that is subscribed to the key.
	 */
	removeOnlyFirstKeyedListener: boolean
}