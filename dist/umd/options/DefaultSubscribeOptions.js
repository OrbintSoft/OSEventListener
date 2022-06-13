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
    exports.DefaultSubscribeOptions = void 0;
    /**
     * Default settings for subscribe options
     */
    exports.DefaultSubscribeOptions = {
        /**
         * as default doesn't throw errors
         */
        shouldThrowErrors: false,
        /**
         * as default you can't subscribe multiple times the same function
         */
        allowMultipleSubscribeSameFunction: false
    };
});
