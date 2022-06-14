var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("OSEventListener", ["require", "exports", "DefaultSubscribeOptions", "DefaultEventListenerOptions", "DefaultUnsubscribeOptions", "NullLogger", "OptionsMapper", "./options/DefaultSubscribeWithKeyOptions", "./options/DefaultUnsubscribeWithKeyOptions", "DefaultDispatchOptions", "DefaultWaitUntilFirstDispatchOptions"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _OSEventListener_instances, _OSEventListener_name, _OSEventListener_listeners, _OSEventListener_logger, _OSEventListener_firstDispatchOccurred, _OSEventListener_keyMappedListeners, _OSEventListener_latestData, _OSEventListener_removeFunctionFromKeyMap;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OSEventListener = void 0;
    /// <amd-module name="OSEventListener"/>
    const DefaultSubscribeOptions_1 = require("DefaultSubscribeOptions");
    const DefaultEventListenerOptions_1 = require("DefaultEventListenerOptions");
    const DefaultUnsubscribeOptions_1 = require("DefaultUnsubscribeOptions");
    const NullLogger_1 = require("NullLogger");
    const OptionsMapper_1 = require("OptionsMapper");
    const DefaultSubscribeWithKeyOptions_1 = require("./options/DefaultSubscribeWithKeyOptions");
    const DefaultUnsubscribeWithKeyOptions_1 = require("./options/DefaultUnsubscribeWithKeyOptions");
    const DefaultDispatchOptions_1 = require("DefaultDispatchOptions");
    const DefaultWaitUntilFirstDispatchOptions_1 = require("DefaultWaitUntilFirstDispatchOptions");
    /**
     * @author Stefano Balzarotti
     * @copyright OrbintSoft
     * Simple event listener.
     */
    class OSEventListener {
        /**
         * @param {string} name the name of the event
         * @param {EventListenerOptions} [options=DefaultEventListenerOptions] settings
         */
        constructor(name, options = DefaultEventListenerOptions_1.DefaultEventListenerOptions) {
            _OSEventListener_instances.add(this);
            _OSEventListener_name.set(this, '');
            _OSEventListener_listeners.set(this, []);
            _OSEventListener_logger.set(this, NullLogger_1.NullLogger);
            _OSEventListener_firstDispatchOccurred.set(this, false);
            _OSEventListener_keyMappedListeners.set(this, new Map());
            _OSEventListener_latestData.set(this, null);
            options = OptionsMapper_1.OptionsMapper.map(options, DefaultEventListenerOptions_1.DefaultEventListenerOptions);
            __classPrivateFieldSet(this, _OSEventListener_logger, options.logger, "f");
            __classPrivateFieldSet(this, _OSEventListener_name, name, "f");
        }
        /**
         * @returns {string} The event name
         */
        get name() {
            return __classPrivateFieldGet(this, _OSEventListener_name, "f");
        }
        /**
         * @returns {Logger} The internal logger
         */
        get logger() {
            return __classPrivateFieldGet(this, _OSEventListener_logger, "f");
        }
        /**
         * @param {ListenerFunction} fn the function you want subscribe to the event
         * @param {SubscribeOptions} [options=DefaultSubscribeOptions] settings
         * @returns {boolean} function successfully subscribed
         */
        subscribe(fn, options = DefaultSubscribeOptions_1.DefaultSubscribeOptions) {
            options = OptionsMapper_1.OptionsMapper.map(options, DefaultSubscribeOptions_1.DefaultSubscribeOptions);
            if (!__classPrivateFieldGet(this, _OSEventListener_listeners, "f").includes(fn) || options.allowMultipleSubscribeSameFunction) {
                __classPrivateFieldGet(this, _OSEventListener_listeners, "f").push(fn);
                return true;
            }
            else {
                const errorMessage = 'An attempt to subscribe multiple times the same function occurred';
                if (options.shouldThrowErrors) {
                    throw new Error(errorMessage);
                }
                else {
                    __classPrivateFieldGet(this, _OSEventListener_logger, "f").warn(errorMessage);
                    return false;
                }
            }
        }
        /**
         * @param {ListenerFunction} fn the function you want unsubscribe from the event
         * @param {UnsubscribeOptions} [options=DefaultUnsubscribeOptions] settings
         * @returns {boolean} function successfully unsubscribed
         */
        unsubscribe(fn, options = DefaultUnsubscribeOptions_1.DefaultUnsubscribeOptions) {
            options = OptionsMapper_1.OptionsMapper.map(options, DefaultUnsubscribeOptions_1.DefaultUnsubscribeOptions);
            let i = -1;
            let found = false;
            do {
                i = __classPrivateFieldGet(this, _OSEventListener_listeners, "f").indexOf(fn);
                if (i !== -1) {
                    __classPrivateFieldGet(this, _OSEventListener_listeners, "f").splice(i, 1);
                    found = true;
                }
                if (options.removeOnlyFirstOccurrence) {
                    break;
                }
            } while (i !== -1);
            if (found) {
                __classPrivateFieldGet(this, _OSEventListener_instances, "m", _OSEventListener_removeFunctionFromKeyMap).call(this, fn, options);
                return true;
            }
            else {
                const errorMessage = 'An attempt to unsubscribe a non sunscribed function occurred';
                if (options.shouldThrowErrors) {
                    throw new Error(errorMessage);
                }
                else {
                    __classPrivateFieldGet(this, _OSEventListener_logger, "f").warn(errorMessage);
                    return false;
                }
            }
        }
        /**
         * Resets the first dispatch status
         */
        resetFirstDispatch() {
            __classPrivateFieldSet(this, _OSEventListener_firstDispatchOccurred, false, "f");
        }
        /**
         * Dispatch the event
         *
         * @param {unknown} sender who is dispatching the event
         * @param {unknown} data payload
         * @param {DispatchOptions} [options=DefaultDispatchOptions] settings
         */
        dispatch(sender, data, options = DefaultDispatchOptions_1.DefaultDispatchOptions) {
            options = OptionsMapper_1.OptionsMapper.map(options, DefaultDispatchOptions_1.DefaultDispatchOptions);
            if (options.storeData) {
                __classPrivateFieldSet(this, _OSEventListener_latestData, data, "f");
            }
            __classPrivateFieldSet(this, _OSEventListener_firstDispatchOccurred, true, "f");
            for (const f of __classPrivateFieldGet(this, _OSEventListener_listeners, "f")) {
                try {
                    f(sender, data);
                }
                catch (ex) {
                    __classPrivateFieldGet(this, _OSEventListener_logger, "f").error(ex);
                }
            }
        }
        /**
         * @param {WaitUntilFirstDispatchOptions} options settings
         * @returns {Promise<unknown>} payload data
         */
        waitUntilFirstDispatchAsync(options = DefaultWaitUntilFirstDispatchOptions_1.DefaultWaitUntilFirstDispatchOptions) {
            const myself = this;
            options = OptionsMapper_1.OptionsMapper.map(options, DefaultWaitUntilFirstDispatchOptions_1.DefaultWaitUntilFirstDispatchOptions);
            if (options.resetFirstDispatchBefore) {
                this.resetFirstDispatch();
            }
            if (__classPrivateFieldGet(this, _OSEventListener_firstDispatchOccurred, "f")) {
                if (options.resetFirstDispatchAfter) {
                    this.resetFirstDispatch();
                }
                return Promise.resolve(__classPrivateFieldGet(this, _OSEventListener_latestData, "f"));
            }
            else {
                let listener;
                const promise = new Promise((resolve, reject) => {
                    listener = (sender, data) => {
                        myself.unsubscribe(listener);
                        if (options.resetFirstDispatchAfter) {
                            myself.resetFirstDispatch();
                        }
                        resolve(data);
                    };
                    if (!myself.subscribe(listener)) {
                        reject();
                    }
                });
                return promise;
            }
        }
        /**
         * @param {ListenerFunction} fn the function to subscribe
         * @param {string} key the key to be used fir subscribe
         * @param {SubscribeWithKeyOptions} [options = DefaultSubscribeWithKeyOptions] settings
         * @returns {boolean} if subscribed successfully
         */
        subscribeWithKey(fn, key, options = DefaultSubscribeWithKeyOptions_1.DefaultSubscribeWithKeyOptions) {
            options = OptionsMapper_1.OptionsMapper.map(options, DefaultSubscribeWithKeyOptions_1.DefaultSubscribeWithKeyOptions);
            const mappedListeners = __classPrivateFieldGet(this, _OSEventListener_keyMappedListeners, "f").get(key) || [];
            if (mappedListeners.length === 0 || options.allowMultipleListernersPerKey) {
                mappedListeners.push(fn);
            }
            else {
                const errorMessage = 'An attempt to add a listener with same key occurred';
                if (options.shouldThrowErrors) {
                    throw Error(errorMessage);
                }
                else {
                    __classPrivateFieldGet(this, _OSEventListener_logger, "f").error(errorMessage);
                    return false;
                }
            }
            __classPrivateFieldGet(this, _OSEventListener_keyMappedListeners, "f").set(key, mappedListeners);
            return this.subscribe(fn);
        }
        /**
         * @param {string} key the key to use for unsubscribe
         * @param {UnsubscribeWithKeyOptions} [options = DefaultUnsubscribeWithKeyOptions] settings
         * @returns {boolean} if unsubscribed successfully
         */
        unsubscribeWithKey(key, options = DefaultUnsubscribeWithKeyOptions_1.DefaultUnsubscribeWithKeyOptions) {
            const mappedListeners = __classPrivateFieldGet(this, _OSEventListener_keyMappedListeners, "f").get(key) || [];
            let found = false;
            for (const fn of mappedListeners) {
                this.unsubscribe(fn, options);
                found = true;
                if (options.removeOnlyFirstKeyedListener) {
                    break;
                }
            }
            if (!found) {
                const errorMessage = 'An attempt to unsubscribe a non mapped listener occurred';
                if (options.shouldThrowErrors) {
                    throw Error(errorMessage);
                }
                else {
                    __classPrivateFieldGet(this, _OSEventListener_logger, "f").warn(errorMessage);
                }
            }
            return found;
        }
    }
    exports.OSEventListener = OSEventListener;
    _OSEventListener_name = new WeakMap(), _OSEventListener_listeners = new WeakMap(), _OSEventListener_logger = new WeakMap(), _OSEventListener_firstDispatchOccurred = new WeakMap(), _OSEventListener_keyMappedListeners = new WeakMap(), _OSEventListener_latestData = new WeakMap(), _OSEventListener_instances = new WeakSet(), _OSEventListener_removeFunctionFromKeyMap = function _OSEventListener_removeFunctionFromKeyMap(fn, options) {
        if (typeof (fn._keyedOsEvent) === 'string') {
            const possibleFns = __classPrivateFieldGet(this, _OSEventListener_keyMappedListeners, "f").get(fn._keyedOsEvent);
            if (possibleFns) {
                let i = -1;
                do {
                    i = possibleFns.indexOf(fn);
                    if (i !== -1) {
                        possibleFns.splice(i, 1);
                    }
                    if (options.removeOnlyFirstOccurrence) {
                        break;
                    }
                } while (i !== -1);
            }
        }
    };
});
//# sourceMappingURL=OSEventListener.js.map