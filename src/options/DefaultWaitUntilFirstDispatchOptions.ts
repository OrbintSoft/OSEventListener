/// <amd-module name="DefaultWaitUntilFirstDispatchOptions"/>
import { WaitUntilFirstDispatchOptions } from './WaitUntilFirstDispatchOptions';

/**
 * Default options for wait until first dispatch.
 */
export const DefaultWaitUntilFirstDispatchOptions: WaitUntilFirstDispatchOptions = {
	/**
	 * Per default when called, it doesn't reset the state, so if the event is already fired it returns the state without waiting.
	 */
	resetFirstDispatchBefore: false,
	/**
	 * Per default when the event is fired it doesn't resets the state, so if called after the event is fired doesn't wait for another event.
	 */
	resetFirstDispatchAfter: false
};