/**
 * Used to configure if an error must be handled or if it must be thrown.
 */
export interface ErrorThrowable {
	/**
	 * If should throw errors in case of failure
	 */
	shouldThrowErrors: boolean
}