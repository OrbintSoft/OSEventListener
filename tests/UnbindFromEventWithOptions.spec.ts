import { assert } from 'chai';
import { describe, it } from 'mocha';
import EventListener from '../src/EventListener';
import MemoryLogger from './mocks/MemoryLogger';

describe('EventListener test unbind from event with options', function() {
	it('should not throw error', () => {
		const logger = new MemoryLogger();
		const event1 = new EventListener('event1', { logger: logger });
		const event2 = new EventListener('event2', { logger: logger });
		const event3 = new EventListener('event3', { logger: logger });
		const result1 = event1.bindToEvent(event2);
		assert.equal(result1, true);
		const result2 = event1.unbindFromEvent(event2, { shouldThrowErrors: false });
		assert.equal(result2, true);
		const result3 = event1.unbindFromEvent(event2, { shouldThrowErrors: false });
		assert.equal(result3, false);
		const result4 = event2.unbindFromEvent(event3, { shouldThrowErrors: false });
		assert.equal(result4, false);
		assert.equal(logger.warnMessages.length, 2);
		event1.bindToEvent(event2, { shouldThrowErrors: false });
		const error1 = logger.warnMessages[0] as string[];
		assert.equal(error1.length, 1);
		assert.equal(error1[0], 'No binded event event2 found');
		const error2 = logger.warnMessages[1] as string[];
		assert.equal(error2.length, 1);
		assert.equal(error2[0], 'No binded event event3 found');
	});

	it('should throw error', () => {
		const logger = new MemoryLogger();
		const event1 = new EventListener('event1', { logger: logger });
		const event2 = new EventListener('event2', { logger: logger });
		const event3 = new EventListener('event3', { logger: logger });
		const result1 = event1.bindToEvent(event2);
		assert.equal(result1, true);
		const result2 = event1.unbindFromEvent(event2, { shouldThrowErrors: true });
		assert.equal(result2, true);
		assert.throw(() => event1.unbindFromEvent(event2, { shouldThrowErrors: true }), 'No binded event event2 found');
		event2.unbindFromEvent(event3);
		assert.throw(() => event2.unbindFromEvent(event3, { shouldThrowErrors: true }), 'No binded event event3 found');
	});
});