import { assert } from 'chai';
import EventListener from '../src/EventListener';
import OptionsMapper from '../src/options/OptionsMapper';
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
		const options = {};
		const defaultOptions = { a: 'a2', b: 'b2', c: 'c2' };
		const resultOptions = OptionsMapper.map(options, defaultOptions);
		assert.deepEqual<unknown>(resultOptions, { a: 'a2', c: 'c2' });
		Object.prototype.hasOwnProperty = hasOwnProperty;
	});
});