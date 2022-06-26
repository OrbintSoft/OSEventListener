/**
 * Options for dispatch
 */
export default interface DispatchOptions {
	/**
	 * if store the dispatched data for later use
	 */
	storeData: boolean
	/**
	 * if the execution must be deferred to be execyted in a second moment
	 */
	defer: boolean
}