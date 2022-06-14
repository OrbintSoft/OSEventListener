/// <amd-module name="DefaultSubscribeOptions"/>
import { SubscribeOptions } from './SubscribeOptions';

/**
 * Default settings for subscribe options
 */
export const DefaultSubscribeOptions : SubscribeOptions = {
	/**
	 * as default doesn't throw errors
	 */
	shouldThrowErrors: false,
	/**
	 * as default you can't subscribe multiple times the same function
	 */
	allowMultipleSubscribeSameFunction: false
};