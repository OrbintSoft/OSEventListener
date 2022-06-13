(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./DefaultSubscribeOptions"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultSubscribeWithKeyOptions = void 0;
    const DefaultSubscribeOptions_1 = require("./DefaultSubscribeOptions");
    /**
     * Default options for subscribe with key options.
     */
    exports.DefaultSubscribeWithKeyOptions = {
        /**
         * Multiple listeners per single key are allowed per default.
         */
        allowMultipleListernersPerKey: true,
        /**
         * Multiple listeners per single key are allowed per default.
         */
        shouldThrowErrors: DefaultSubscribeOptions_1.DefaultSubscribeOptions.shouldThrowErrors,
        /**
         * Same function cannot be used multiple times as listener per default.
         */
        allowMultipleSubscribeSameFunction: DefaultSubscribeOptions_1.DefaultSubscribeOptions.allowMultipleSubscribeSameFunction
    };
});
