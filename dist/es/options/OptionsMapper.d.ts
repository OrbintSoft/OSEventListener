/**
 * Utility to map default properties
 */
export declare class OptionsMapper {
    /**
     * Used to merge new options to default options
     *
     * @template T
     * @param {Partial<T> & object} options the new options
     * @param {T & object} defaultOptions the default options
     * @returns {T} the merged options
     */
    static map<T>(options: Partial<T> & object, defaultOptions: (T & object)): T;
}
