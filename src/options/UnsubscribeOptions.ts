import ErrorThrowable from './ErrorThrowable';
/// <amd-module name="options/UnsubscribeOptions"/>
/**
 * Option settings for unsubscribe.
 */
export default interface UnsubscribeOptions extends ErrorThrowable {
	/**
	 * if enabled during the unsubscribe only the first occurence will be removed otherwise all occurrences of same subscribed function.
	 */
	removeOnlyFirstOccurrence: boolean
}