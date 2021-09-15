const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: [
		//__dirname + '/src/App.js',
		__dirname + '/src/custom.scss'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'ignore.this.file.js',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'meeting.css'
		})
	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					//'postcss-loader',
					'sass-loader',
				],
			},

		]
	}
};