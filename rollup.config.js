import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (format, filename) {
	const isMinify = filename.indexOf('.min') >= 0;

	const config = {
		input: 'src/built/index.js',
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
	getConfig('umd', 'react-tabber'),
	getConfig('umd', 'react-tabber.min'),
	getConfig('esm', 'react-tabber.esm')
];
