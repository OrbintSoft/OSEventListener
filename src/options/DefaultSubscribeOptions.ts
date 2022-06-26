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
	allowMultipleSubscribeSameFunction: false
};

export default DefaultSubscribeOptions;