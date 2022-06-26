import ErrorThrowable from './ErrorThrowable';
/// <amd-module name="options/SubscribeOptions"/>
/**
 * Sets the options settings for subscribe.
 */
export default interface SubscribeOptions extends ErrorThrowable {
	/**
	 * allows to subscribe multiple times the same function
	 */
	allowMultipleSubscribeSameFunction: boolean
}