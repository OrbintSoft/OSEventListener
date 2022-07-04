const EventListener = require('oseventlistener').EventListener;
const event = new EventListener('logEvent');
event.subscribe(() => {
	console.log('IT WORKS');
});
event.dispatch(this, 'data');