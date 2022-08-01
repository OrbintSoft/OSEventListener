import { assert } from 'chai';
import { describe, it } from 'mocha';
import EventListener from '../src/EventListener';
import OptionsMapper from '../src/options/OptionsMapper';
import EventListenerWithBadSubscribe from './mocks/EventListenerWithBadSubscribe';
import EventListenerWithBadUnsubscribe from './mocks/EventListenerWithBadUnsubscribe';
import MemoryLogger from './mocks/MemoryLogger';

describe('It tests evil situtations that should not naturally occurs', () => {
	it('EventListener uses console logger if available', () => {
		const memoryLogger =  new MemoryLogger() ;
		const console = global.console;
		Object.defineProperty(global, 'console', { value: memoryLogger });

		const event = new EventListener('e');
		const fn = () => {};
		event.subscribe(fn);
		assert.equal(memoryLogger.warnMessages.length, 0);
		event.subscribe(fn);
		assert.equal(memoryLogger.warnMessages.length, 1);

		Object.defineProperty(global, 'console', { value: null });
		const event2 = new EventListener('e');
		event2.subscribe(fn);
		assert.equal(memoryLogger.warnMessages.length, 1);
		event2.subscribe(fn);
		assert.equal(memoryLogger.warnMessages.length, 1);

		Object.defineProperty(global, 'console', { value: console });
		assert.equal(global.console, console);
	});

	it('OptionsMapper it does not map not own correctly', () => {
		const hasOwnProperty = Object.prototype.hasOwnProperty;
		Object.prototype.hasOwnProperty = function(property: string) {
			return property in this && property !== 'b';
		};
		const options = { a: 'newA', b: 'newB' };
		const defaultOptions = { a: 'a2', b: 'b2', c: 'c2' };
		const resultOptions = OptionsMapper.map(options, defaultOptions);
		assert.deepEqual<unknown>(resultOptions, { a: 'newA', b: 'b2', c: 'c2' });
		Object.prototype.hasOwnProperty = hasOwnProperty;
	});

	it('waitUntilFirstDispatchAsync fails if subsrcribe fails', (done) => {
		const eventListener = new EventListenerWithBadSubscribe('bad');
		eventListener.waitUntilFirstDispatchAsync().catch(() => {
			done();
		});
	});

	it('unsubscribeWithKey fails if unsubsrcribe fails', () => {
		const memoryLogger =  new MemoryLogger() ;
		const eventListener = new EventListenerWithBadUnsubscribe('bad', { logger: memoryLogger });
		eventListener.subscribeWithKey(() => {}, 'key1');
		const result = eventListener.unsubscribeWithKey('key1');
		assert.equal(result, false);
		assert.equal(memoryLogger.warnMessages.length, 2);
		const warnings = memoryLogger.warnMessages[0] as string[];
		assert.equal(warnings.length, 1);
		assert.equal(warnings[0], 'Failed to unsubscribe a registered function, probably it was already unsubscribed');
	});

	it('mixed bad usage of subscribe and unsubscribe with and without key', () => {
		const fn = () => {};
		const eventListener = new EventListener('event');
		let ok = eventListener.subscribe(fn, { allowMultipleSubscribeSameFunction: true });
		ok &&= eventListener.subscribeWithKey(fn, 'KEY', { allowMultipleSubscribeSameFunction: true });
		ok &&= eventListener.unsubscribeWithKey('KEY', { removeOnlyFirstKeyedListener: true, removeOnlyFirstOccurrence: true });
		ok &&= eventListener.unsubscribe(fn);
		assert.equal(ok, true);
	});
});