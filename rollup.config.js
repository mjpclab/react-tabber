import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (isMinify) {
	const config = {
		input: 'src/built/index.js',
		output: {
			name: 'ReactTabber',
			format: 'umd',
			globals: {
				react: 'React',
				'prop-types': 'PropTypes'
			},
			file: `dist/react-tabber${isMinify ? '.min' : ''}.js`,
		},
		external: ['react', 'prop-types'],
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
			isMinify && uglify()
		],
	};

	return config;
};

export default [
	getConfig(false),
	getConfig(true)
];
