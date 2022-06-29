import { assert } from 'chai';
import { describe, it } from 'mocha';
import OSEventListener from '../src/OSEventListener';

describe('OSEventListener basic tests', function() {
	it('sets name', function() {
		const name = 'myEvent';
		const event = new OSEventListener(name);
		assert.equal(event.name, name);
	});

	it('dispatch', function() {
		const event = new OSEventListener('myEvent');
		const sender1 = { a: 'sender' };
		const data1 = { b: 'data' };
		const sender2 = { d: (e: unknown) => e };
		const data2 = true;
		let count = 0;
		const ok = event.subscribe((s, d) => {
			if (count === 0) {
				assert.equal(s, sender1);
				assert.equal(d, data1);
			} else {
				assert.equal(s, sender2);
				assert.equal(d, data2);
			}
			count++;
		});
		event.dispatch(sender1, data1);
		event.dispatch(sender2, data2);
		assert.equal(ok, true);
	});

	it('subscribe', function() {
		const event = new OSEventListener('myEvent');
		let f1Called = 0;
		let f2Called = 0;
		let f3Called = 0;
		let ok = event.subscribe((s: unknown, d: unknown) => {
			f1Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		});
		ok &&= event.subscribe((s: unknown, d: unknown) => {
			f2Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		});
		ok &&= event.subscribe((s: unknown, d: unknown) => {
			f3Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		});
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 1);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 1);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 2);
		assert.equal(f2Called, 2);
		assert.equal(f3Called, 2);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 3);
		assert.equal(f2Called, 3);
		assert.equal(f3Called, 3);
		assert.equal(ok, true);
	});

	it('unsubscribe', function() {
		const event = new OSEventListener('myEvent');
		let f1Called = 0;
		let f2Called = 0;
		let f3Called = 0;
		let ok = true;
		const f1 = (s: unknown, d: unknown) => {
			f1Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		};
		const f2 = (s: unknown, d: unknown) => {
			f2Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		};
		const f3 = (s: unknown, d: unknown) => {
			f3Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		};
		ok &&= event.subscribe(f1);
		ok &&= event.subscribe(f2);
		ok &&= event.subscribe(f3);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 1);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 1);
		ok &&= event.unsubscribe(f2);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 2);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 2);
		ok &&= event.unsubscribe(f1);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 2);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 3);
		ok &&= event.unsubscribe(f3);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 2);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 3);
		assert.equal(ok, true);
	});

	it('subscribe with key', function() {
		const event = new OSEventListener('myEvent');
		let f1Called = 0;
		let f2Called = 0;
		let f3Called = 0;
		let ok = event.subscribeWithKey((s: unknown, d: unknown) => {
			f1Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		}, 'key1');
		ok &&= event.subscribeWithKey((s: unknown, d: unknown) => {
			f2Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		}, 'key2');
		ok &&= event.subscribeWithKey((s: unknown, d: unknown) => {
			f3Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		}, 'key3');
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 1);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 1);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 2);
		assert.equal(f2Called, 2);
		assert.equal(f3Called, 2);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 3);
		assert.equal(f2Called, 3);
		assert.equal(f3Called, 3);
		assert.equal(ok, true);
	});

	it('unsubscribe with key', function() {
		const event = new OSEventListener('myEvent');
		let f1Called = 0;
		let f2Called = 0;
		let f3Called = 0;
		event.subscribeWithKey((s: unknown, d: unknown) => {
			f1Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		}, 'key1');
		event.subscribeWithKey((s: unknown, d: unknown) => {
			f2Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		}, 'key2');
		event.subscribeWithKey((s: unknown, d: unknown) => {
			f3Called++;
			assert.equal(s, 'sender');
			assert.equal(d, 'data');
		}, 'key3');
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 1);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 1);
		event.unsubscribeWithKey('key2');
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 2);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 2);
		event.unsubscribeWithKey('key1');
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 2);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 3);
		event.unsubscribeWithKey('key3');
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 2);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 3);
	});

	it('waits until first dispatch, not dispatched yet', function(done) {
		const event1 = new OSEventListener('myEvent');
		let called1 = 0;
		event1.waitUntilFirstDispatchAsync().then((data) => {
			called1++;
			assert.equal(data, 'data1');
		}).catch((error) => {
			throw error;
		});
		setTimeout(() => {
			assert.equal(called1, 0); //promise is not resolved yet
			event1.dispatch('sender', 'data1');
			setTimeout(() => {
				assert.equal(called1, 1); //promise is resolved
				event1.waitUntilFirstDispatchAsync().then((data) => {
					called1++;
					assert.equal(data, 'data1');
				}).catch((error) => {
					throw error;
				});
				event1.dispatch('sender', 'data2');
				event1.dispatch('sender', 'data3');
				setTimeout((data: unknown) => {
					assert.equal(data, undefined); //promise is already resolved
					assert.equal(called1, 2);
				}, 0);
			}, 0);
		}, 0);
		setTimeout(() => {
			done();
		}, 20);
	});

	it('waits until first dispatch, already dispatched', function(done) {
		const event1 = new OSEventListener('myEvent');
		let called1 = 0;
		event1.dispatch('sender', 'data1');
		assert.equal(called1, 0);
		event1.waitUntilFirstDispatchAsync().then((data) => {
			called1++;
			assert.equal(data, undefined);
		}).catch((error) => {
			throw error;
		});
		setTimeout(() => {
			assert.equal(called1, 1);
			event1.waitUntilFirstDispatchAsync().then((data) => {
				called1++;
				assert.equal(data, undefined);
			}).catch((error) => {
				throw error;
			});
			event1.dispatch('sender', 'data2');
			event1.dispatch('sender', 'data3');
			setTimeout(() => {
				assert.equal(called1, 2);
			}, 0);
		}, 0);
		setTimeout(() => {
			done();
		}, 20);
	});

	it('it resets first dispatch, not dispatched yet', function(done) {
		const event1 = new OSEventListener('myEvent');
		let called1 = 0;
		event1.waitUntilFirstDispatchAsync().then((data) => {
			assert.equal(data, 'data1');
			called1++;
		}).catch((error) => {
			throw error;
		});
		setTimeout(() => {
			assert.equal(called1, 0);
			event1.dispatch('sender', 'data1');
			setTimeout(() => {
				assert.equal(called1, 1);
				event1.resetFirstDispatch();
				event1.waitUntilFirstDispatchAsync().then((data) => {
					assert.equal(data, 'data2');
					called1++;
				}).catch((error) => {
					throw error;
				});
				event1.dispatch('sender', 'data2');
				setTimeout(() => {
					assert.equal(called1, 2);
					event1.waitUntilFirstDispatchAsync().then((data) => {
						assert.equal(data, undefined);
						called1++;
					}).catch((error) => {
						throw error;
					});
					event1.dispatch('sender', 'data3');
					setTimeout(() => {
						assert.equal(called1, 3);
					}, 0);
				}, 0);
			}, 0);
		}, 0);
		setTimeout(() => {
			done();
		}, 20);
	});
});