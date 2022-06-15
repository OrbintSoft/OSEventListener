/// <amd-module name="options/SubscribeWithKeyOptions"/>
import { SubscribeOptions } from './SubscribeOptions';

/**
 * Option settings for Subscribe with key.
 */
export interface SubscribeWithKeyOptions extends SubscribeOptions {
	/**
	 * if enabled allows to register multiple listeners to the same key.
	 */
	allowMultipleListernersPerKey: boolean
}