import EventListener from '../../src/EventListener';
import ListenerFunction from '../../src/ListenerFunction';
import SubscribeOptions from '../../src/options/SubscribeOptions';

export default class EventListenerWithBadSubscribe extends EventListener {
	subscribe(fn: ListenerFunction, options?: Partial<SubscribeOptions>): boolean {
		super.subscribe(fn, options);
		return false;
	}
}