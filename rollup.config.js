import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (filename) {
	const format = filename.indexOf('.esm') >= 0 ? 'esm' : 'umd';
	const isMinify = filename.indexOf('.min') >= 0;

	const config = {
		input: 'built/index.js',
		output: {
			name: 'ReactTabber',
			format: format,
			globals: {
				react: 'React',
				'prop-types': 'PropTypes'
			},
			file: `dist/${filename}.js`,
		},
		external: ['react', 'prop-types'],
		plugins: [
			resolve(),
			commonjs(),
			isMinify && uglify()
		],
	};

	return config;
};

export default [
	getConfig('react-tabber'),
	getConfig('react-tabber.min'),
	getConfig('react-tabber.esm')
];
