(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../utilities/NullLogger"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultEventListenerOptions = void 0;
    const NullLogger_1 = require("../utilities/NullLogger");
    /**
     * Default settings for event listener options
     */
    exports.DefaultEventListenerOptions = {
        /**
         * console is used as default logger if available
         */
        logger: console !== null && console !== void 0 ? console : NullLogger_1.NullLogger
    };
});
