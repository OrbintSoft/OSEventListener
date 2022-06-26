/**
 * The function that is listening for an event
 */
type ListenerFunction = (
/**
 * @param {unknown} sender who dispatched the event
 * @param {unknown} data the payload
 */
	(sender: unknown, data: unknown) => void
) & { 
	/**
	 * @member {string} _keyedOsEvent for internal use, association with key event
	 */
	_keyedOsEvent?: string
};

export default ListenerFunction;