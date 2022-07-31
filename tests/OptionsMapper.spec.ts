import { assert } from 'chai';
import { describe, it } from 'mocha';
import OptionsMapper from '../src/options/OptionsMapper';

describe('Options Mapper', function() {
	it('it returns different object same properties if equal', () => {
		const obj1 = { a: 'a', b: 'b' };
		const obj2 = OptionsMapper.map(obj1, obj1);
		assert.notEqual(obj1, obj2);
		assert.deepEqual(obj1, obj2);
	});

	it('it maps properties correctly', () => {
		const options = { a: 'a', b: 'b' };
		const defaultOptions = { b: 'b2', c: 'c' };
		const obj3 = OptionsMapper.map(options, defaultOptions);
		assert.deepEqual<unknown>(obj3, { b: 'b', c: 'c' });
	});
});