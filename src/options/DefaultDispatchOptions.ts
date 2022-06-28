import DispatchOptions from './DispatchOptions';
/**
 * Default settings for dispatch options
 */
const DefaultDispatchOptions: DispatchOptions = {
	/**
	 * data is not stored as default
	 */
	storeData: false,
	/**
	 * the event is not deferred as default
	 */
	defer: false,
	/**
	 * if a subscribed function throws extecption is catched per default
	 */
	shouldThrowErrors: false
};

export default DefaultDispatchOptions;