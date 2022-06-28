import { assert } from 'chai';
import { describe, it } from 'mocha';
import OSEventListener from '../src/OSEventListener';
import MemoryLogger from './mocks/MemoryLogger';

describe('OSEventListener test dispatch', function () {
	it('dispatch is not deferred', () => {
		const logger = new MemoryLogger();
		const event = new OSEventListener('myevent', { logger: logger });
		let count = 0;
		const ok = event.subscribe((s, d) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data1');
			count++;
		});
		assert.equal(ok, true);
		assert.equal(count, 0);
		event.dispatch('sender', 'data1', { defer: false });
		assert.equal(count, 1);
		assert.lengthOf(logger.errorMessages, 0);
	});

	it('dispatch is deferred', (done) => {
		const logger = new MemoryLogger();
		const event = new OSEventListener('myevent', { logger: logger});
		let count = 0;
		const ok = event.subscribe((s, d) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data1');
			count++;
		});
		assert.equal(ok, true);
		assert.equal(count, 0);
		event.dispatch('sender', 'data1', { defer: true });
		assert.equal(count, 0);
		setTimeout(() => {
			assert.equal(count, 1);
			assert.lengthOf(logger.errorMessages, 0);
			done();
		}, 0);
	});

	it('dispatch does not throw errors', () => {
		const logger = new MemoryLogger();
		const event = new OSEventListener('myevent', { logger: logger});
		let count = 0;
		const error = Error('second subscribe thwrow an error');
		let ok = event.subscribe((s, d) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data1');
			count++;
		});
		ok &&= event.subscribe((s, d) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data1');
			count++;
			throw error;
		});
		ok &&= event.subscribe((s, d) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data1');
			count++;
		});
		assert.equal(ok, true);
		assert.equal(count, 0);
		event.dispatch('sender', 'data1', { shouldThrowErrors: false });
		assert.equal(count, 3);
		assert.lengthOf(logger.errorMessages, 1);
		assert.isNotNull(logger.errorMessages[0]);
		const errors = logger.errorMessages[0] as Error[];
		assert.lengthOf(errors, 1);
		assert.equal(errors[0], error);
	});

	it('dispatch throws errors', () => {
		const logger = new MemoryLogger();
		const event = new OSEventListener('myevent', { logger: logger});
		let count = 0;
		const error = Error('second subscribe thwrow an error');
		let ok = event.subscribe((s, d) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data1');
			count++;
		});
		ok &&= event.subscribe((s, d) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data1');
			count++;
			throw error;
		});
		ok &&= event.subscribe((s, d) => {
			assert.equal(s, 'sender');
			assert.equal(d, 'data1');
			count++;
		});
		assert.equal(ok, true);
		assert.equal(count, 0);
		assert.Throw(() => {
			event.dispatch('sender', 'data1', { shouldThrowErrors: true });
		}, error.message);
		assert.equal(count, 2);
		assert.lengthOf(logger.errorMessages, 0);
	});

	it('dispatch does not store data', (done) => {
		const logger = new MemoryLogger();
		const event = new OSEventListener('myevent', { logger: logger });
		event.dispatch('sender', 'data1', { storeData: false });
		event.waitUntilFirstDispatchAsync().then(data => {
			assert.equal(data, undefined);
			done();
		}).catch((error) => {
			throw error;
		});
		assert.lengthOf(logger.errorMessages, 0);
	});


	it('dispatch stores data', (done) => {
		const logger = new MemoryLogger();
		let count = 0;
		const event = new OSEventListener('myevent', { logger: logger });
		event.dispatch('sender', 'data1', { storeData: true });		
		event.waitUntilFirstDispatchAsync().then(data => {
			assert.equal(data, 'data1');
			count++;
		}).catch((error) => {
			throw error;
		});
		event.dispatch('sender', 'data2', { storeData: true });
		event.dispatch('sender', 'data3', { storeData: false });
		event.waitUntilFirstDispatchAsync().then(data => {
			assert.equal(data, 'data2');
			count++;
		}).catch((error) => {
			throw error;
		});
		setTimeout(() => {
			assert.equal(count, 2);
			done();
		}, 20);
		assert.lengthOf(logger.errorMessages, 0);
	});
});