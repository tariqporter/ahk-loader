# ahk-loader

[Webpack](http://webpack.github.io/) plugin that loads autohotkey files (ahk)

## Installation

```
npm install --save-dev ahk-loader
```

## Usage

Can be used with [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) to extract an `.ahk` file after build

``` javascript
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//...
	module.exports = {
		module: {
			loaders: [{
				test: /\.ahk$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: 'ahk-loader'
					}]
				})
			}]
		}
	}
```
