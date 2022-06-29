/**
 * The function that is listening for an event
 */
type ListenerFunction = (
/**
 * @param {unknown} sender who dispatched the event
 * @param {unknown} data the payload
 */
	(sender: unknown, data: unknown) => void
);
export default ListenerFunction;