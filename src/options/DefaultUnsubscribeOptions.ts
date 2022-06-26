import UnsubscribeOptions from './UnsubscribeOptions';
/**
 * Default Unsubscribe options.
 */
const DefaultUnsubscribeOptions: UnsubscribeOptions = {
	/**
	 * Per default unsubscribe cannot throw errors.
	 */
	shouldThrowErrors: false,
	/**
	 * Per default in case the same function is subscribed multiple times, it removes only the first occurence.
	 */
	removeOnlyFirstOccurrence: true
};

export default DefaultUnsubscribeOptions;