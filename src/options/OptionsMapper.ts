/**
 * Utility to map default properties
 */
export default class OptionsMapper {
	/**
	 * Used to merge new options to default options
	 *
	 * @template T
	 * @param {Partial<T> & object} options the new options
	 * @param {T & object} defaultOptions the default options
	 * @returns {T} the merged options
	 */
	static map<T>(options: Partial<T> & object, defaultOptions: (T & object)): T {
		const newOptions: Partial<T> & object = { ...defaultOptions };
		if (defaultOptions === options) {
			return newOptions as T;
		}

		for (const p in options) {
			if (Object.prototype.hasOwnProperty.call(newOptions, p) && Object.prototype.hasOwnProperty.call(options, p)) {
				newOptions[p] = options[p];
			}
		}
		return newOptions as T;
	}
}