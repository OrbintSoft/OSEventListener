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
    exports.DefaultUnsubscribeOptions = void 0;
    /**
     * Default Unsubscribe options.
     */
    exports.DefaultUnsubscribeOptions = {
        /**
         * Per default unsubscribe cannot throw errors.
         */
        shouldThrowErrors: false,
        /**
         * Per default in case the same function is subscribed multiple times, it removes only the first occurence.
         */
        removeOnlyFirstOccurrence: true
    };
});
