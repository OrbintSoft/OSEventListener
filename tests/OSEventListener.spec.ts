import { assert } from 'chai';
import { describe, it } from 'mocha';
import OSEventListener from '../src/OSEventListener';

describe('OSEventListener', function () {
	it('sets correct name', function () {
		const name = 'myEvent';
		const event = new OSEventListener(name);
		assert.equal(event.name, name);
	});

	it('dispatchs', function () {
		const event = new OSEventListener('myEvent');
		const sender1 = { a :'sender' };
		const data1 = { b : 'data' };
		const sender2 = { d : (e: unknown) => e };
		const data2 = true;
		let count = 0;
		event.subscribe((s, d) => {
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
	});

	it('subscribe works', function () {
		const event = new OSEventListener('myEvent');
		let f1Called = 0;
		let f2Called = 0;
		let f3Called = 0;
		event.subscribe(() => {
			f1Called++;
		});
		event.subscribe(() => {
			f2Called++;
		});
		event.subscribe(() => {
			f3Called++;
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
	});

	it('unsubscribe works', function () {
		const event = new OSEventListener('myEvent');
		let f1Called = 0;
		let f2Called = 0;
		let f3Called = 0;
		const f1 = () => {
			f1Called++;
		};
		const f2 = () => {
			f2Called++;
		};
		const f3 = () => {
			f3Called++;
		};
		event.subscribe(f1);
		event.subscribe(f2);
		event.subscribe(f3);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 1);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 1);
		event.unsubscribe(f2);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 2);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 2);
		event.unsubscribe(f1);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 2);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 3);
		event.unsubscribe(f3);
		event.dispatch('sender', 'data');
		assert.equal(f1Called, 2);
		assert.equal(f2Called, 1);
		assert.equal(f3Called, 3);
	});
});