import ListenerFunction from '../../src/ListenerFunction';
import SubscribeOptions from '../../src/options/SubscribeOptions';
import EventListener from '../../src/EventListener';

export default class EventListenerWithBadUnsubscribe extends EventListener {
	unsubscribe(fn: ListenerFunction, options?: Partial<SubscribeOptions>): boolean {
		super.unsubscribe(fn, options);
		return false;
	}
}