import { assert } from 'chai';
import { describe, it } from 'mocha';
import EventListener from '../src/EventListener';
import MemoryLogger from './mocks/MemoryLogger';

describe('EventListener test unsubscribe with options', function() {
	it('unsubscribe only the first function', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;
		const fn = (s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		};

		const ok1 = event.subscribe(fn, {
			allowMultipleSubscribeSameFunction: true
		});
		const ok2 = event.subscribe(fn, {
			allowMultipleSubscribeSameFunction: true
		});
		assert.equal(ok1, true);
		assert.equal(ok2, true);
		assert.equal(count, 0);
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
		const ok3 = event.unsubscribe(fn, { removeOnlyFirstOccurrence: true });
		assert.equal(ok3, true);
		event.dispatch('sender', 'data');
		assert.equal(count, 3);
		const ok4 = event.unsubscribe(fn, { removeOnlyFirstOccurrence: true });
		assert.equal(ok4, true);
		event.dispatch('sender', 'data');
		assert.equal(count, 3);
	});

	it('unsubscribe all functions', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;
		const fn = (s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		};

		const ok1 = event.subscribe(fn, {
			allowMultipleSubscribeSameFunction: true
		});
		const ok2 = event.subscribe(fn, {
			allowMultipleSubscribeSameFunction: true
		});
		assert.equal(ok1, true);
		assert.equal(ok2, true);
		assert.equal(count, 0);
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
		const ok3 = event.unsubscribe(fn, { removeOnlyFirstOccurrence: false });
		assert.equal(ok3, true);
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
		const ok4 = event.unsubscribe(fn, { removeOnlyFirstOccurrence: true });
		assert.equal(ok4, false);
	});

	it('does not throw errors', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		const fn = () => {};
		const ok1 = event.unsubscribe(() => {}, { shouldThrowErrors: false });
		assert.equal(ok1, false);
		const ok2 = event.subscribe(fn);
		assert.equal(ok2, true);
		const ok3 = event.unsubscribe(() => {}, { shouldThrowErrors: false });
		assert.equal(ok3, false);
		const ok4 = event.unsubscribe(fn, { shouldThrowErrors: false });
		assert.equal(ok4, true);
		const ok5 = event.unsubscribe(fn, { shouldThrowErrors: false });
		assert.equal(ok5, false);
		const ok6 = event.unsubscribe(() => {}, { shouldThrowErrors: false });
		assert.equal(ok6, false);
	});

	it('does throws errors', function() {
		const logger = new MemoryLogger();
		const errorMessage = 'An attempt to unsubscribe a non subscribed function occurred';
		const event = new EventListener('myevent', { logger: logger });
		const fn = () => {};
		assert.throw(() => event.unsubscribe(() => {}, { shouldThrowErrors: true }), errorMessage);
		const ok2 = event.subscribe(fn);
		assert.equal(ok2, true);
		assert.throw(() => event.unsubscribe(() => {}, { shouldThrowErrors: true }), errorMessage);
		const ok4 = event.unsubscribe(fn, { shouldThrowErrors: true });
		assert.equal(ok4, true);
		assert.throw(() => event.unsubscribe(fn, { shouldThrowErrors: true }));
		assert.throw(() => event.unsubscribe(() => {}, { shouldThrowErrors: true }), errorMessage);
	});

	it('unsubscribe if subscribed with keys', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;
		const fn = (s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		};

		const ok1 = event.subscribeWithKey(fn, 'kqy1');
		assert.equal(ok1, true);
		assert.equal(count, 0);
		event.dispatch('sender', 'data');
		assert.equal(count, 1);
		const ok2 = event.unsubscribe(fn);
		assert.equal(ok2, true);
		event.dispatch('sender', 'data');
		assert.equal(count, 1);
	});
});