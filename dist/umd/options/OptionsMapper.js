(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("OptionsMapper", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OptionsMapper = void 0;
    /// <amd-module name="OptionsMapper"/>
    /**
     * Utility to map default properties
     */
    class OptionsMapper {
        /**
         * Used to merge new options to default options
         *
         * @template T
         * @param {Partial<T> & object} options the new options
         * @param {T & object} defaultOptions the default options
         * @returns {T} the merged options
         */
        static map(options, defaultOptions) {
            if (defaultOptions === options) {
                return defaultOptions;
            }
            for (const p in defaultOptions) {
                if (Object.prototype.hasOwnProperty.call(defaultOptions, p)) {
                    if (!Object.prototype.hasOwnProperty.call(options, p)) {
                        options[p] = defaultOptions[p];
                    }
                }
            }
            return options;
        }
    }
    exports.OptionsMapper = OptionsMapper;
});
//# sourceMappingURL=OptionsMapper.js.map