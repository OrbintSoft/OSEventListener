(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("DefaultDispatchOptions", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultDispatchOptions = void 0;
    /**
     * Default settings for dispatch options
     */
    exports.DefaultDispatchOptions = {
        /**
         * data is not stored as defaultclear
         */
        storeData: false
    };
});
//# sourceMappingURL=DefaultDispatchOptions.js.map