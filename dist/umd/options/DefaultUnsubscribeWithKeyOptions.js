(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultUnsubscribeWithKeyOptions = void 0;
    /**
     * Default options for unsubscribe with key.
     */
    exports.DefaultUnsubscribeWithKeyOptions = {
        /**
         * Per default all listeners with same key are unsubscribed.
         */
        removeOnlyFirstKeyedListener: false,
        /**
         * Per default all functions with same key are unsubscribed.
         */
        removeOnlyFirstOccurrence: false,
        /**
         * Per default unsubscribe doesn't throw errors.
         */
        shouldThrowErrors: false
    };
});
//# sourceMappingURL=DefaultUnsubscribeWithKeyOptions.js.map