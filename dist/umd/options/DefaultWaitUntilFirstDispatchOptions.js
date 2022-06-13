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
    exports.DefaultWaitUntilFirstDispatchOptions = void 0;
    /**
     * Default options for wait until first dispatch.
     */
    exports.DefaultWaitUntilFirstDispatchOptions = {
        /**
         * Per default when called, it doesn't reset the state, so if the event is already fired it returns the state without waiting.
         */
        resetFirstDispatchBefore: false,
        /**
         * Per default when the event is fired it doesn't resets the state, so if called after the event is fired doesn't wait for another event.
         */
        resetFirstDispatchAfter: false
    };
});
