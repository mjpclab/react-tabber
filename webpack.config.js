const webpack = require('webpack');
const path = require('path');

const resolveConfig = {
	extensions: ['.ts', '.tsx', '.js']
};

function toCapitalize(str) {
	let result = str.replace(/-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
	result = result.substr(0, 1).toUpperCase() + result.substr(1);
	while (true) {
		let sepPos = result.search(/-./);
		if (sepPos === -1) break;
		result = result.substr(0, sepPos) + result.substr(sepPos + 1, 1).toUpperCase() + result.substr(sepPos + 2);
	}
	return result;
}

const getEntryConfig = function (entry) {
	return path.resolve(entry);
};

const getOutputConfig = function (libraryName, isMinify) {
	return {
		library: {
			commonjs: libraryName,
			amd: libraryName,
			root: toCapitalize(libraryName)
		},
		libraryTarget: 'umd',
		libraryExport: 'default',
		path: path.resolve('dist'),
		filename: libraryName + (isMinify ? '.min' : '') + '.js'
	};
};

const getModuleConfig = function (isMinify) {
	return {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{loader: 'awesome-typescript-loader'}
				]
			},
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader', options: {minimize: isMinify}}
				]
			}
		]
	};
};

const externalsConfig = {
	react: {
		commonjs: 'react',
		commonjs2: 'react',
		amd: 'react',
		root: 'React'
	}
};

const entries = [
	{name: 'react-tabber', path: 'src/ts/react-tabber.tsx'},
	{name: 'react-tabber-with-css', path: 'with-css.ts'}
];

let confs = [];
entries.forEach(entry => {
	//development version
	confs.push({
		resolve: resolveConfig,
		entry: getEntryConfig(entry.path),
		output: getOutputConfig(entry.name, false),
		module: getModuleConfig(false),
		externals: externalsConfig,
		plugins: []
	});

	//production version
	confs.push({
		resolve: resolveConfig,
		entry: getEntryConfig(entry.path),
		output: getOutputConfig(entry.name, true),
		module: getModuleConfig(true),
		externals: externalsConfig,
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					properties: false
				},
				sourceMap: true
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			})
		]
	});
});

module.exports = confs;
