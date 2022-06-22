import sourcemaps from 'rollup-plugin-sourcemaps';
export default [{
	input: ['index.js'],
	plugins: [sourcemaps()],
	output: {
		file: '../dist/bundle/OSEventListener.js',
		format: 'iife',
		name: 'OSEventListener',
		esModule: false,
		exports: 'named',
		sourcemap: true,

	},
	context: 'window'
}];