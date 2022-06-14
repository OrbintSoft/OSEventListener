(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("NullLogger", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullLogger = void 0;
    /**
     * Used to disable logging.
     */
    exports.NullLogger = {
        /**
         * do nothing
         */
        debug: function () {
        },
        /**
         * do nothing
         */
        error: function () {
        },
        /**
         * do nothing
         */
        info: function () {
        },
        /**
         * do nothing
         */
        log: function () {
        },
        /**
         * do nothing
         */
        trace: function () {
        },
        /**
         * do nothing
         */
        warn: function () {
        }
    };
});
//# sourceMappingURL=NullLogger.js.map