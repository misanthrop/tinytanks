webpack = require 'webpack'

module.exports =
	entry: './main.coffee'
	output:
		path: '/tmp/tinytanks'
		filename: 'all.js'
	module:
		rules: [
			{ test: /\.coffee$/, use: 'coffee-loader' }
			{ test: /\.slm$/, use: ['file-loader?name=[name].html', 'slm-loader'] }
			{ test: /\.sass$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
			{ test: /\.svg$/, use: ['file-loader', 'svgo-loader'] }
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
