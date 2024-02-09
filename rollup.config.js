import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const getConfig = function (filename) {
	const format = filename.indexOf('.esm') >= 0 ? 'esm' : 'umd';
	const isMinify = filename.indexOf('.min') >= 0;

	const config = {
		input: 'src/ts/index.tsx',
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
			typescript(),
			isMinify && terser()
		],
	};

	return config;
};

export default [
	getConfig('react-tabber'),
	getConfig('react-tabber.min'),
	getConfig('react-tabber.esm')
];
