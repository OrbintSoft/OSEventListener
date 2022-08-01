import { assert } from 'chai';
import ListenerWrapper from '../src/ListenerWrapper';

describe('ListenerWrapper test', ()=> {
	it('sets properties correctly', () => {
		const fn = ()=> {};
		const w1 = new ListenerWrapper(fn);
		assert.equal(w1.fn, fn);
		assert.equal(w1.keyedEvent, null);
		assert.equal(w1.priority, null);

		const w2 = new ListenerWrapper(fn, 'K');
		assert.equal(w2.fn, fn);
		assert.equal(w2.keyedEvent, 'K');
		assert.equal(w2.priority, null);

		const w3 = new ListenerWrapper(fn, 'K', 3);
		assert.equal(w3.fn, fn);
		assert.equal(w3.keyedEvent, 'K');
		assert.equal(w3.priority, 3);
	});
});