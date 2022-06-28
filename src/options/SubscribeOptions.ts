import ErrorThrowable from './ErrorThrowable';
/**
 * Sets the options settings for subscribe.
 */
export default interface SubscribeOptions extends ErrorThrowable {
	/**
	 * allows to subscribe multiple times the same function
	 */
	allowMultipleSubscribeSameFunction: boolean
	/**
	 * used to set an execution order, if null, the function is executed in subscribe order.
	 * if a positive number is provided, the function has higher priority.
	 * if a negative number is provided, the function has lower priority.
	 */
	priority: null | number
}