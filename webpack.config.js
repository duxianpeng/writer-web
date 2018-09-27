const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const webpack = require('webpack');
const CopyWebpackPlugin= require("copy-webpack-plugin");

module.exports = {
	devtool: 'eval-source-map',
  entry: path.resolve(__dirname, "app/main.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
		{
			test: /\.(jsx|js)$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						"env", "react"
					]
				}
			}
		},
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: path.resolve(__dirname, "postcss.config.js")
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 50000,
              outputPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/i,
        use: ["html-withimg-loader"]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: path.resolve(__dirname, "postcss.config.js")
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: path.resolve(__dirname, "postcss.config.js")
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      hash: true,
      template: "./app/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
	}),
	new PurifyCSSPlugin({
		paths: glob.sync(path.join(__dirname, 'app/*.html'))
	}),
	new webpack.ProvidePlugin({
		$: "jquery",
		_: "lodash"
	}),
	new CopyWebpackPlugin([{
        from:__dirname+'/app/docs',
        to:'./docs'
	}]),
	new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    host: "localhost",
    compress: true,
    port: 8080
  }
};
