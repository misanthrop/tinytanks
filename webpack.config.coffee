webpack = require 'webpack'

module.exports =
	entry: './main.coffee'
	output:
		path: '/tmp/tinytanks'
		filename: 'all.js'
	module:
		rules: [
			{ test: /\.coffee$/, use: 'coffee-loader' }
			{ test: /\.html$/, use: 'file-loader' }
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }
			{ test: /\.png$/, use: 'file-loader' }
		]
	devtool: 'source-map'
	devServer:
		hot: true
		inline: true
	plugins: [
		new webpack.HotModuleReplacementPlugin
		new webpack.NamedModulesPlugin
	]
