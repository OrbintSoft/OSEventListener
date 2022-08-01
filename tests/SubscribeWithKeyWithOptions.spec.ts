import { assert } from 'chai';
import { describe, it } from 'mocha';
import EventListener from '../src/EventListener';
import MemoryLogger from './mocks/MemoryLogger';

describe('EventListener test subscribe with key with options', function() {
	it('does not subscribe same function multiple times', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;
		const fn = (s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		};

		const ok = event.subscribeWithKey(fn, 'mykey', {
			allowMultipleSubscribeSameFunction: false
		});
		const ko = event.subscribeWithKey(fn, 'anotherKey', {
			allowMultipleSubscribeSameFunction: false
		});
		assert.equal(ok, true);
		assert.equal(ko, false);
		assert.equal(count, 0);
		event.dispatch('sender', 'data');
		assert.equal(count, 1);
		assert.lengthOf(logger.warnMessages, 1);
		const warnings = logger.warnMessages[0] as string[];
		assert.lengthOf(warnings, 1);
		assert.equal(warnings[0], 'An attempt to subscribe multiple times the same function occurred');
	});

	it('does subscribe same function multiple times', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;
		const fn = (s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		};

		const ok1 = event.subscribeWithKey(fn, 'mykey', {
			allowMultipleSubscribeSameFunction: true
		});
		const ok2 = event.subscribeWithKey(fn, 'anotherKey', {
			allowMultipleSubscribeSameFunction: true
		});
		assert.equal(ok1, true);
		assert.equal(ok2, true);
		assert.equal(count, 0);
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
		assert.lengthOf(logger.warnMessages, 0);
	});

	it('does not subscribe multiple listeners with same key', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;

		const ok = event.subscribeWithKey((s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		}, 'mykey', {
			allowMultipleListernersPerKey: false
		});
		const ko = event.subscribeWithKey((s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		}, 'mykey', {
			allowMultipleListernersPerKey: false
		});
		assert.equal(ok, true);
		assert.equal(ko, false);
		assert.equal(count, 0);
		event.dispatch('sender', 'data');
		assert.equal(count, 1);
		assert.lengthOf(logger.errorMessages, 1);
		const errors = logger.errorMessages[0] as string[];
		assert.lengthOf(errors, 1);
		assert.equal(errors[0], 'An attempt to add a listener with same key occurred');
	});

	it('does subscribe multiple listeners with same key', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;

		const ok1 = event.subscribeWithKey((s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		}, 'mykey', {
			allowMultipleListernersPerKey: true
		});
		const ok2 = event.subscribeWithKey((s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		}, 'mykey', {
			allowMultipleListernersPerKey: true
		});
		assert.equal(ok1, true);
		assert.equal(ok2, true);
		assert.equal(count, 0);
		event.dispatch('sender', 'data');
		assert.equal(count, 2);
		assert.lengthOf(logger.warnMessages, 0);
	});

	it('listeners are executed in correct order', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		const executionOrder: number[] = [];
		let ok = event.subscribeWithKey(() => {
			executionOrder.push(1);
		}, 'key1', {
			priority: null
		});
		ok &&= event.subscribeWithKey(() => {
			executionOrder.push(2);
		}, 'key2', {
			priority: 5
		});
		ok &&= event.subscribeWithKey(() => {
			executionOrder.push(3);
		}, 'key3', {
			priority: -3
		});
		ok &&= event.subscribeWithKey(() => {
			executionOrder.push(4);
		}, 'key4', {
			priority: null
		});
		ok &&= event.subscribeWithKey(() => {
			executionOrder.push(5);
		}, 'key5', {
			priority: 8
		});
		assert.equal(ok, true);
		event.dispatch('sender', 'data');
		assert.deepEqual(executionOrder, [5, 2, 1, 4, 3]);
	});

	it('does not throw errors', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		const fn = () => {};
		const ok = event.subscribeWithKey(fn, 'key1', {
			shouldThrowErrors: false
		});
		const ko1 = event.subscribeWithKey(fn, 'key2', {
			shouldThrowErrors: false
		});
		const ko2 = event.subscribeWithKey(() => {}, 'key1', {
			shouldThrowErrors: false,
			allowMultipleListernersPerKey: false
		});
		assert.equal(ok, true);
		assert.equal(ko1, false);
		assert.equal(ko2, false);
		assert.lengthOf(logger.warnMessages, 1);
		const warnings = logger.warnMessages[0] as string[];
		assert.lengthOf(warnings, 1);
		assert.equal(warnings[0], 'An attempt to subscribe multiple times the same function occurred');
		const errors = logger.errorMessages[0] as string[];
		assert.lengthOf(errors, 1);
		assert.equal(errors[0], 'An attempt to add a listener with same key occurred');
	});

	it('throws errors', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		const fn = () => {};
		const ok = event.subscribeWithKey(fn, 'key1', {
			shouldThrowErrors: false
		});
		assert.equal(ok, true);
		assert.throw(() => {
			event.subscribeWithKey(fn, 'key2', {
				shouldThrowErrors: true
			});
		}, 'An attempt to subscribe multiple times the same function occurred');
		assert.throw(() => {
			event.subscribeWithKey(() => {}, 'key1', {
				shouldThrowErrors: true,
				allowMultipleListernersPerKey: false
			});
		}, 'An attempt to add a listener with same key occurred');
	});
});