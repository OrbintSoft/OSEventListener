import { ErrorThrowable } from './ErrorThrowable';
/**
 * Option settings for unsubscribe.
 */
export interface UnsubscribeOptions extends ErrorThrowable {
    /**
     * if enabled during the unsubscribe only the first occurence will be removed otherwise all occurrences of same subscribed function.
     */
    removeOnlyFirstOccurrence: boolean;
}
