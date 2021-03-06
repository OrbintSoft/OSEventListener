import { assert } from 'chai';
import { describe, it } from 'mocha';
import EventListener from '../src/EventListener';
import MemoryLogger from './mocks/MemoryLogger';

describe('EventListener test unsubscribe with key with options', function() {
	it('it does unsubscribe all listeners when a key has multiple subscribed listeners', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;

		let ok = event.subscribeWithKey((s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		}, 'key1');
		ok &&= event.subscribeWithKey((s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		}, 'key1');
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
		ok &&= event.unsubscribeWithKey('key1', { removeOnlyFirstKeyedListener: false });
		assert.equal(ok, true);
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
	});

	it('it does unsubscribe only last listener when a key has multiple subscribed listeners', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;

		let ok = event.subscribeWithKey((s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		}, 'key1');
		ok &&= event.subscribeWithKey((s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		}, 'key1');
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
		ok &&= event.unsubscribeWithKey('key1', { removeOnlyFirstKeyedListener: true });
		assert.equal(ok, true);
		event.dispatch('sender', 'data');
		assert.equal(count, 3);
		ok &&= event.unsubscribeWithKey('key1', { removeOnlyFirstKeyedListener: true });
		assert.equal(ok, true);
		event.dispatch('sender', 'data');
		assert.equal(count, 3);
	});

	it('unsubscribe only the first function', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;
		const fn = (s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		};

		const ok1 = event.subscribeWithKey(fn, 'key1', {
			allowMultipleSubscribeSameFunction: true,
		});
		const ok2 = event.subscribeWithKey(fn, 'key2', {
			allowMultipleSubscribeSameFunction: true
		});
		assert.equal(ok1, true);
		assert.equal(ok2, true);
		assert.equal(count, 0);
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
		const ok3 = event.unsubscribeWithKey('key1', { removeOnlyFirstOccurrence: true });
		assert.equal(ok3, true);
		event.dispatch('sender', 'data');
		assert.equal(count, 3);
		const ok4 = event.unsubscribeWithKey('key2', { removeOnlyFirstOccurrence: true });
		assert.equal(ok4, true);
		event.dispatch('sender', 'data');
		assert.equal(count, 3);
	});

	it('unsubscribe all listeners with same function', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;
		const fn = (s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		};

		const ok1 = event.subscribeWithKey(fn, 'key1', {
			allowMultipleSubscribeSameFunction: true,
		});
		const ok2 = event.subscribeWithKey(fn, 'key2', {
			allowMultipleSubscribeSameFunction: true
		});
		assert.equal(ok1, true);
		assert.equal(ok2, true);
		assert.equal(count, 0);
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
		const ok3 = event.unsubscribeWithKey('key1', { removeOnlyFirstOccurrence: false });
		assert.equal(ok3, true);
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
		const ok4 = event.unsubscribeWithKey('key2', { removeOnlyFirstOccurrence: false });
		assert.equal(ok4, false);
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
	});

	it('does not throw errors', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		const fn = () => {};
		const ok1 = event.unsubscribeWithKey('key1', { shouldThrowErrors: false });
		assert.equal(ok1, false);
		const ok2 = event.subscribeWithKey(fn, 'key1');
		assert.equal(ok2, true);
		const ok3 = event.unsubscribeWithKey('key2', { shouldThrowErrors: false });
		assert.equal(ok3, false);
		const ok4 = event.unsubscribeWithKey('key1', { shouldThrowErrors: false });
		assert.equal(ok4, true);
		const ok5 = event.unsubscribeWithKey('key1', { shouldThrowErrors: false });
		assert.equal(ok5, false);
		const ok6 = event.unsubscribeWithKey('key2', { shouldThrowErrors: false });
		assert.equal(ok6, false);
	});

	it('does throws errors', function() {
		const logger = new MemoryLogger();
		const errorMessage = 'An attempt to unsubscribe a non mapped listener occurred';
		const event = new EventListener('myevent', { logger: logger });
		const fn = () => {};
		assert.throw(() => event.unsubscribeWithKey('key1', { shouldThrowErrors: true }), errorMessage);
		const ok2 = event.subscribeWithKey(fn, 'key1');
		assert.equal(ok2, true);
		assert.throw(() => event.unsubscribeWithKey('key2', { shouldThrowErrors: true }), errorMessage);
		const ok4 = event.unsubscribeWithKey('key1', { shouldThrowErrors: true });
		assert.equal(ok4, true);
		assert.throw(() => event.unsubscribeWithKey('key1', { shouldThrowErrors: true }));
		assert.throw(() => event.unsubscribeWithKey('key2', { shouldThrowErrors: true }), errorMessage);
	});
});