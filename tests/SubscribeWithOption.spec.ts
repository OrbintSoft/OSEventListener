import { assert } from 'chai';
import EventListener from '../src/EventListener';
import MemoryLogger from './mocks/MemoryLogger';

describe('EventListener test subscribe', function() {
	it('does not subscribe same function multiple times', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;
		const fn = (s: unknown, d: unknown) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
			count++;
		};

		const ok = event.subscribe(fn, {
			allowMultipleSubscribeSameFunction: false
		});
		const ko = event.subscribe(fn, {
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
		assert.lengthOf(logger.warnMessages, 0);
	});

	it('listeners are executed in correct order', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		const executionOrder: number[] = [];
		let ok = event.subscribe(() => {
			executionOrder.push(1);
		}, {
			priority: null
		});
		ok &&= event.subscribe(() => {
			executionOrder.push(2);
		}, {
			priority: 5
		});
		ok &&= event.subscribe(() => {
			executionOrder.push(3);
		}, {
			priority: -3
		});
		ok &&= event.subscribe(() => {
			executionOrder.push(4);
		}, {
			priority: null
		});
		ok &&= event.subscribe(() => {
			executionOrder.push(5);
		}, {
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
		const ok = event.subscribe(fn, {
			shouldThrowErrors: false
		});
		const ko = event.subscribe(fn, {
			shouldThrowErrors: false
		});
		assert.equal(ok, true);
		assert.equal(ko, false);
		assert.lengthOf(logger.warnMessages, 1);
		const warnings = logger.warnMessages[0] as string[];
		assert.lengthOf(warnings, 1);
		assert.equal(warnings[0], 'An attempt to subscribe multiple times the same function occurred');
	});

	it('throws errors', function() {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		const fn = () => {};
		const ok = event.subscribe(fn, {
			shouldThrowErrors: true
		});
		assert.equal(ok, true);
		assert.Throw(() => {
			event.subscribe(fn, {
				shouldThrowErrors: true
			});
		}, 'An attempt to subscribe multiple times the same function occurred');
	});
});