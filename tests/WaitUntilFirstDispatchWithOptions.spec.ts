import { assert } from 'chai';
import EventListener from '../src/EventListener';
import MemoryLogger from './mocks/MemoryLogger';

describe('EventListener wait until first dispatch with options', function() {
	it('does not reset current status', function(done) {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;
		let countDispatch = 0;
		event.waitUntilFirstDispatchAsync({
			resetFirstDispatchBefore: false,
			resetFirstDispatchAfter: false
		}).then((data) => {
			assert.equal(data, 'data1');
			assert.equal(countDispatch, 1);
			count++;
			event.waitUntilFirstDispatchAsync({
				resetFirstDispatchBefore: false,
				resetFirstDispatchAfter: false
			}).then((data) => {
				assert.equal(data, 'data1');
				assert.equal(countDispatch, 1);
				count++;
				event.waitUntilFirstDispatchAsync({
					resetFirstDispatchBefore: false,
					resetFirstDispatchAfter: false
				}).then((data) => {
					assert.equal(data, 'data1');
					assert.equal(countDispatch, 1);
					count++;
					setTimeout(() => {
						event.dispatch('sender', 'data2', { storeData: true });
						countDispatch++;
					}, 2);
					event.waitUntilFirstDispatchAsync({
						resetFirstDispatchBefore: false,
						resetFirstDispatchAfter: false
					}).then((data) => {
						assert.equal(data, 'data1');
						assert.equal(countDispatch, 1);
						count++;
						setTimeout(() => {
							event.dispatch('sender', 'data3', { storeData: true });
							countDispatch++;
						}, 2);
					});
				});
			});
			setTimeout(() => {
				event.dispatch('sender', 'data2', { storeData: true });
				countDispatch++;
			}, 2);
		});
		setTimeout(() => {
			event.dispatch('sender', 'data1', { storeData: true });
			countDispatch++;
		}, 2);
		setTimeout(() => {
			assert.equal(count, 4);
			done();
		}, 20);
	});

	it('resets status before wait', function(done) {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;
		let countDispatch = 0;
		event.waitUntilFirstDispatchAsync({
			resetFirstDispatchBefore: true,
			resetFirstDispatchAfter: false
		}).then((data) => {
			assert.equal(data, 'data1');
			assert.equal(countDispatch, 1);
			count++;
			event.waitUntilFirstDispatchAsync({
				resetFirstDispatchBefore: true,
				resetFirstDispatchAfter: false
			}).then((data) => {
				assert.equal(data, 'data2');
				assert.equal(countDispatch, 2);
				count++;
				let triggered = false;
				event.waitUntilFirstDispatchAsync({
					resetFirstDispatchBefore: true,
					resetFirstDispatchAfter: false
				}).then((data) => {
					triggered = true;
					assert.equal(data, 'data3');
					assert.equal(countDispatch, 3);
					count++;
					setTimeout(() => {
						event.dispatch('sender', 'data4', { storeData: true });
						countDispatch++;
					}, 0);
					event.waitUntilFirstDispatchAsync({
						resetFirstDispatchBefore: true,
						resetFirstDispatchAfter: false
					}).then((data) => {
						assert.equal(data, 'data4');
						assert.equal(countDispatch, 4);
						count++;
						setTimeout(() => {
							event.dispatch('sender', 'data5', { storeData: true });
							countDispatch++;
						}, 0);
					});
				});
				setTimeout(() => {
					assert.equal(triggered, false);
					if (!triggered) {
						event.dispatch('sender', 'data3', { storeData: true });
						countDispatch++;
					}
				}, 5);
			});
			setTimeout(() => {
				event.dispatch('sender', 'data2', { storeData: true });
				countDispatch++;
			}, 0);
		});
		setTimeout(() => {
			event.dispatch('sender', 'data1', { storeData: true });
			countDispatch++;
		}, 0);
		setTimeout(() => {
			assert.equal(count, 4);
			done();
		}, 20);
	});

	it('resets status after dispatch', function(done) {
		const logger = new MemoryLogger();
		const event = new EventListener('myevent', { logger: logger });
		let count = 0;
		let countDispatch = 0;
		event.waitUntilFirstDispatchAsync({
			resetFirstDispatchBefore: false,
			resetFirstDispatchAfter: true
		}).then((data) => {
			assert.equal(data, 'data1');
			assert.equal(countDispatch, 1);
			count++;
			event.waitUntilFirstDispatchAsync({
				resetFirstDispatchBefore: false,
				resetFirstDispatchAfter: true
			}).then((data) => {
				assert.equal(data, 'data1');
				assert.equal(countDispatch, 1);
				count++;
				let triggered = false;
				event.waitUntilFirstDispatchAsync({
					resetFirstDispatchBefore: false,
					resetFirstDispatchAfter: true
				}).then((data) => {
					triggered = true;
					assert.equal(data, 'data2');
					assert.equal(countDispatch, 2);
					count++;
					setTimeout(() => {
						event.dispatch('sender', 'data4', { storeData: true });
						countDispatch++;
					}, 2);
					event.waitUntilFirstDispatchAsync({
						resetFirstDispatchBefore: false,
						resetFirstDispatchAfter: true
					}).then((data) => {
						assert.equal(data, 'data2');
						assert.equal(countDispatch, 2);
						count++;
						setTimeout(() => {
							event.dispatch('sender', 'data5', { storeData: true });
							countDispatch++;
						}, 2);
					});
				});
				setTimeout(() => {
					assert.equal(triggered, true);
					if (!triggered) {
						event.dispatch('sender', 'data3', { storeData: true });
						countDispatch++;
					}
				}, 5);
			});
			setTimeout(() => {
				event.dispatch('sender', 'data2', { storeData: true });
				countDispatch++;
			}, 2);
		});
		setTimeout(() => {
			event.dispatch('sender', 'data1', { storeData: true });
			countDispatch++;
		}, 2);
		setTimeout(() => {
			assert.equal(count, 4);
			done();
		}, 20);
	});
});