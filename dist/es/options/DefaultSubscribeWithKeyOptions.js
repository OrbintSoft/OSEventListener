import { DefaultSubscribeOptions } from './DefaultSubscribeOptions';
/**
 * Default options for subscribe with key options.
 */
export const DefaultSubscribeWithKeyOptions = {
    /**
     * Multiple listeners per single key are allowed per default.
     */
    allowMultipleListernersPerKey: true,
    /**
     * Multiple listeners per single key are allowed per default.
     */
    shouldThrowErrors: DefaultSubscribeOptions.shouldThrowErrors,
    /**
     * Same function cannot be used multiple times as listener per default.
     */
    allowMultipleSubscribeSameFunction: DefaultSubscribeOptions.allowMultipleSubscribeSameFunction
};
//# sourceMappingURL=DefaultSubscribeWithKeyOptions.js.map