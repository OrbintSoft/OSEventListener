/// <amd-module name="options/DefaultSubscribeWithKeyOptions"/>
import { DefaultSubscribeOptions } from './DefaultSubscribeOptions';
import { SubscribeWithKeyOptions } from './SubscribeWithKeyOptions';

/**
 * Default options for subscribe with key options.
 */
export const DefaultSubscribeWithKeyOptions: SubscribeWithKeyOptions = {
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