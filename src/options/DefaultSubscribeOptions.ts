import SubscribeOptions from './SubscribeOptions';
/**
 * Default settings for subscribe options
 */
const DefaultSubscribeOptions: SubscribeOptions = {
	/**
	 * as default doesn't throw errors
	 */
	shouldThrowErrors: false,
	/**
	 * as default you can't subscribe multiple times the same function
	 */
	allowMultipleSubscribeSameFunction: false,
	/**
	 * as default the subscribe function has no priority
	 */
	priority: null
};

export default DefaultSubscribeOptions;