/// <amd-module name="options/DefaultUnsubscribeWithKeyOptions"/>
import UnsubscribeWithKeyOptions from './UnsubscribeWithKeyOptions';

/**
 * Default options for unsubscribe with key.
 */
const DefaultUnsubscribeWithKeyOptions: UnsubscribeWithKeyOptions = {
	/**
	 * Per default all listeners with same key are unsubscribed.
	 */
	removeOnlyFirstKeyedListener: false,
	/**
	 * Per default all functions with same key are unsubscribed.
	 */
	removeOnlyFirstOccurrence: false,
	/**
	 * Per default unsubscribe doesn't throw errors.
	 */
	shouldThrowErrors: false
};

export default DefaultUnsubscribeWithKeyOptions;