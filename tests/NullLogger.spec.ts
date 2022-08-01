import { assert } from 'chai';
import { describe, it } from 'mocha';
import NullLogger from '../src/utilities/NullLogger';

describe('tests null logger', () => {
	it('does nothing', (done) => {
		let result = NullLogger.debug();
		assert.equal(result, undefined);
		result = NullLogger.error();
		assert.equal(result, undefined);
		result = NullLogger.info();
		assert.equal(result, undefined);
		result = NullLogger.log();
		assert.equal(result, undefined);
		result = NullLogger.warn();
		assert.equal(result, undefined);
		result = NullLogger.trace();
		assert.equal(result, undefined);
		done();
	});
});