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
			{ test: /\.svg$/, use:
				loader: 'cmd-output-file-loader', options:
					name: '[hash].png'
					command: "inkscape -z -e [output] [input]" }
		]
	devtool: 'source-map'
	devServer:
		hot: true
		inline: true
	plugins: [
		new webpack.HotModuleReplacementPlugin
		new webpack.NamedModulesPlugin
	]
