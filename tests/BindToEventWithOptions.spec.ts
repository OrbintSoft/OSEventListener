import { assert } from 'chai';
import { describe, it } from 'mocha';
import EventListener from '../src/EventListener';
import MemoryLogger from './mocks/MemoryLogger';

describe('EventListener test bind to event with options', function() {
	it('should not throw error', () => {
		const logger = new MemoryLogger();
		const event1 = new EventListener('event1', { logger: logger });
		const event2 = new EventListener('event2', { logger: logger });
		const result1 = event1.bindToEvent(event2, { shouldThrowErrors: false });
		assert.equal(result1, true);
		assert.equal(logger.errorMessages.length, 0);
		const result2 = event1.bindToEvent(event2, { shouldThrowErrors: false });
		assert.equal(result2, false);
		assert.equal(logger.errorMessages.length, 1);
		const error = logger.errorMessages[0] as string[];
		assert.equal(error.length, 1);
		assert.equal(error[0], 'The event event1 is already binded to the event event2');
	});

	it('should throw error', () => {
		const logger = new MemoryLogger();
		const event1 = new EventListener('event1', { logger: logger });
		const event2 = new EventListener('event2', { logger: logger });
		const result1 = event1.bindToEvent(event2, { shouldThrowErrors: true });
		assert.equal(result1, true);
		assert.equal(logger.errorMessages.length, 0);
		assert.Throw(() => event1.bindToEvent(event2, { shouldThrowErrors: true }), 'The event event1 is already binded to the event event2');
	});

	it('should be executed with correct priority', () => {
		const logger = new MemoryLogger();

		const event1 = new EventListener('event1', { logger: logger });
		const event2 = new EventListener('event2', { logger: logger });
		const event3 = new EventListener('event3', { logger: logger });
		const event4 = new EventListener('event4', { logger: logger });
		const event5 = new EventListener('event5', { logger: logger });
		const event6 = new EventListener('event5', { logger: logger });

		let result = event1.bindToEvent(event2, { priority: null });
		result &&= event1.bindToEvent(event3, { priority: -7 });
		result &&= event1.bindToEvent(event4, { priority: 6 });
		result &&= event1.bindToEvent(event6, { priority: 3 });

		const testOrder2: number[] = [];
		const testOrder3: number[] = [];
		const testOrder4: number[] = [];
		const testOrder5: number[] = [];
		const testOrder6: number[] = [];

		const fn2 = () => {
			testOrder2.push(1);
		};
		result &&= event1.subscribe(fn2);
		result &&= event2.subscribe(()  => {
			testOrder2.push(2);
		});
		event2.dispatch('s', 'd');
		result &&= event1.unsubscribe(fn2);
		assert.deepEqual(testOrder2, [1, 2]);

		const fn3 = () => {
			testOrder3.push(1);
		};
		result &&= event1.subscribe(fn3);
		result &&= event3.subscribe(()  => {
			testOrder3.push(3);
		});
		event3.dispatch('s', 'd');
		result &&= event1.unsubscribe(fn3);
		assert.deepEqual(testOrder3, [3, 1]);

		const fn4 = () => {
			testOrder4.push(1);
		};
		result &&= event1.subscribe(fn4);
		result &&= event4.subscribe(()  => {
			testOrder4.push(4);
		});
		event4.dispatch('s', 'd');
		result &&= event1.unsubscribe(fn4);
		assert.deepEqual(testOrder4, [1, 4]);

		const fn5 = () => {
			testOrder5.push(1);
		};
		result &&= event5.subscribe(()  => {
			testOrder5.push(5);
		});
		result &&= event1.subscribe(fn5);
		result &&= event1.bindToEvent(event5, { priority: null });
		event5.dispatch('s', 'd');
		result &&= event1.unsubscribe(fn5);
		assert.deepEqual(testOrder5, [5, 1]);

		const fn6 = () => {
			testOrder6.push(1);
		};
		result &&= event1.subscribe(fn6);
		result &&= event6.subscribe(()  => {
			testOrder6.push(6);
		}, { priority: 4 });
		event6.dispatch('s', 'd');
		result &&= event1.unsubscribe(fn6);
		assert.deepEqual(testOrder6, [6, 1]);

		assert.equal(result, true);
	});

	it('should not be deferred', () => {
		const logger = new MemoryLogger();
		const event1 = new EventListener('event1', { logger: logger });
		const event2 = new EventListener('event2', { logger: logger });
		let count = 0;
		let ok = true;
		ok &&= event1.subscribe(() => {
			count++;
		});
		ok &&= event1.bindToEvent(event2, { defer: false });
		assert.equal(ok, true);
		assert.equal(count, 0);
		event2.dispatch('s', 'd');
		assert.equal(count, 1);
	});

	it('should be deferred', (resolve) => {
		const logger = new MemoryLogger();
		const event1 = new EventListener('event1', { logger: logger });
		const event2 = new EventListener('event2', { logger: logger });
		let count = 0;
		let ok = true;
		ok &&= event1.subscribe(() => {
			count++;
		});
		ok &&= event1.bindToEvent(event2, { defer: true });
		assert.equal(ok, true);
		assert.equal(count, 0);
		event2.dispatch('s', 'd');
		assert.equal(count, 0);
		setTimeout(() => {
			assert.equal(count, 1);
			resolve();
		}, 0);
	});

	it('should not store data', async () => {
		const logger = new MemoryLogger();
		const event1 = new EventListener('event1', { logger: logger });
		const event2 = new EventListener('event2', { logger: logger });
		let ok = true;
		ok &&= event1.bindToEvent(event2, { storeData: false });
		assert.equal(ok, true);
		event2.dispatch('s', 'd');
		const data = await event1.waitUntilFirstDispatchAsync();
		assert.equal(data, undefined);
	});

	it('should store data', async () => {
		const logger = new MemoryLogger();
		const event1 = new EventListener('event1', { logger: logger });
		const event2 = new EventListener('event2', { logger: logger });
		let ok = true;
		ok &&= event1.bindToEvent(event2, { storeData: true });
		assert.equal(ok, true);
		event2.dispatch('s', 'd');
		const data1 = await event1.waitUntilFirstDispatchAsync();
		assert.equal(data1, 'd');
		const data2 = await event1.waitUntilFirstDispatchAsync();
		assert.equal(data2, 'd');
	});
});