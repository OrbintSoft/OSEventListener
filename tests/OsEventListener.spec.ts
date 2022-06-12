import {OSEventListener} from '../src/OSEventListener';

describe('OsEventListener', function () {
    const assert = chai.assert;
    console.log('pippo');
    it('should set the name', function () {
        const osEventListener = new OSEventListener('foo');
        assert.strictEqual(osEventListener.name, 'foo');
        console.log('pluto');
    });
    
});