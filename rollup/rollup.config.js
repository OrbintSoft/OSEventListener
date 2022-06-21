export default [{
	input: ['index.js'],
	output: {
		file: '../dist/bundle/OSEventListener.js',
		format: 'iife',
		name: 'OSEventListener', // this is the name of the global object
		esModule: false,
		exports: 'named',
		sourcemap: true	
	},
	context: 'window'
}];