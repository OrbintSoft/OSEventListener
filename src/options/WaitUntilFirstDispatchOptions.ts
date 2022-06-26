/**
 * Option settings for Wait until first dispatch. 
 */
export default interface WaitUntilFirstDispatchOptions {
	/**
	 * If enabled it resets the state everythime it's called, so at each call it waits until a new event is dispatched.
	 */
	resetFirstDispatchBefore: boolean
	/**
	 * If enabled after the event is dispatched it resets the state, so any subsequent call waits until a new event is dispatched even if the sequent call disables this setting.
	 */
	resetFirstDispatchAfter: boolean
}