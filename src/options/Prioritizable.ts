/**
 * This inferace is used to represent an object that can have a priority.
 */
export default interface Prioritizable {
	/**
	 * used to set an execution order, if null, the function is executed in subscribe order.
	 * if a positive number is provided, the function has higher priority.
	 * if a negative number is provided, the function has lower priority.
	 */
	priority: number|null
}