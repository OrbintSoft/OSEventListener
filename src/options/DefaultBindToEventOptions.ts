import BindToEventOptions from './BindToEventOptions';

/**
 * Default options for bind to event.
 */
const DefaultBindToEventOptions: BindToEventOptions = {
	/**
	 * As defualt it doesn't throw errors.
	 */
	shouldThrowErrors: false,
	/**
	 * As default it doesn't have any priority.
	 */
	priority: null,
	/**
	 * Per default it doesn't store data.
	 */
	storeData: false,
	/**
	 * Per default it doesn't defer the dispatch.
	 */
	defer: false
};

export default DefaultBindToEventOptions;