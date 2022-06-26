import DefaultSubscribeOptions from './DefaultSubscribeOptions';
import SubscribeWithKeyOptions from './SubscribeWithKeyOptions';
/// <amd-module name="options/DefaultSubscribeWithKeyOptions"/>
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
	allowMultipleSubscribeSameFunction: DefaultSubscribeOptions.allowMultipleSubscribeSameFunction
};

export default DefaultSubscribeWithKeyOptions;