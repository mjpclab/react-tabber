const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

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

const PACKAGE_FILE = 'package.json';
const thePackage = JSON.parse(fs.readFileSync(PACKAGE_FILE));

const getEntryConfig = function () {
	return {
		[thePackage.name]: path.resolve(__dirname, thePackage.main),
		[thePackage.nameWithCss]: path.resolve(__dirname, thePackage.mainWithCss)
	};
};

const getOutputConfig = function (isMinify) {
	return {
		library: {
			commonjs: '[name]',
			amd: '[name]',
			root: toCapitalize(thePackage.name)
		},
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist/'),
		filename: '[name]' + (isMinify ? '.min' : '') + '.js'
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

module.exports = [
	{
		entry: getEntryConfig(),
		output: getOutputConfig(false),
		module: getModuleConfig(false),
		externals: externalsConfig,
		plugins: [],
		devtool: 'source-map'
	},
	{
		entry: getEntryConfig(),
		output: getOutputConfig(true),
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
		],
		devtool: 'source-map'
	}
];
