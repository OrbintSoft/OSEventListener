import DefaultSubscribeOptions from './DefaultSubscribeOptions';
import SubscribeWithKeyOptions from './SubscribeWithKeyOptions';
/**
 * Default options for subscribe with key options.
 */
const DefaultSubscribeWithKeyOptions: SubscribeWithKeyOptions = {
	/**
	 * Multiple listeners per single key are allowed per default.
	 */
	allowMultipleListernersPerKey: true,
	/**
	 * Multiple listeners per single key are allowed per default.
	 */
	shouldThrowErrors: DefaultSubscribeOptions.shouldThrowErrors,
	/**
	 * Same function cannot be used multiple times as listener per default.
	 */
	allowMultipleSubscribeSameFunction: DefaultSubscribeOptions.allowMultipleSubscribeSameFunction,
	/**
	 * used to set an execution order, if null, the function is executed in subscribe order.
	 * if a positive number is provided, the function has higher priority.
	 * if a negative number is provided, the function has lower priority.
	 */
	priority: DefaultSubscribeOptions.priority
};

export default DefaultSubscribeWithKeyOptions;