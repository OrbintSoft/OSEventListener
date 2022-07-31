import { assert } from 'chai';
import { describe, it } from 'mocha';
import OptionsMapper from '../src/options/OptionsMapper';

describe('Options Mapper', function() {
	it('it returns same object if equal', () => {
		const obj1 = { a: 'a', b: 'b' };
		const obj2 = OptionsMapper.map(obj1, obj1);
		assert.equal(obj1, obj2);
	});

	it('it maps properties correctly', () => {
		const obj1 = { a: 'a', b: 'b' };
		const obj2 = { b: 'b2', c: 'c' };
		const obj3 = OptionsMapper.map(obj1, obj2);
		assert.deepEqual<unknown>(obj3, { a: 'a', b: 'b', c: 'c' });
	});
});