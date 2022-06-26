import SubscribeOptions from './SubscribeOptions';
/// <amd-module name="options/SubscribeWithKeyOptions"/>
/**
 * Option settings for Subscribe with key.
 */
export default interface SubscribeWithKeyOptions extends SubscribeOptions {
	/**
	 * if enabled allows to register multiple listeners to the same key.
	 */
	allowMultipleListernersPerKey: boolean
}