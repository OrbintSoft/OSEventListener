import { assert } from 'chai';
import { describe, it } from 'mocha';
import OSEventListener from '../src/OSEventListener';

describe('OSEventListener', function () {
	it('sets correct name', function () {
		const event = new OSEventListener('myEvent');
		assert.equal(event.name, 'myEvent');
	});
});