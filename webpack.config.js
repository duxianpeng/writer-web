const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require('glob');
const webpack = require('webpack');
const CopyWebpackPlugin= require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'


module.exports = {
	devtool: 'eval-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      path.resolve(__dirname, "app/app.js")
    ]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
		{
			test: /\.(jsx|js)$/,
      use: {
				loader: 'babel-loader'
      }
		},
      {
        test: /\.css$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader"
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
        test: /\.(woff|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 50000,
              outputPath: "fonts/"
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
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: path.resolve(__dirname, "postcss.config.js")
              }
            }
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: {
              'primary-color': '#1DA57A',
              'link-color': '#1DA57A',
              'border-radius-base': '2px',
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
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
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
	}),
	new webpack.ProvidePlugin({
		$: "jquery",
		_: "lodash"
	}),
	new CopyWebpackPlugin([{
        from:__dirname+'/app/docs',
        to:'./docs'
	}]),
  new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    host: "localhost",
    compress: true,
    port: 8080,
    historyApiFallback: true,  
    inline: true,  
    hot: true,
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
          default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
          },
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
          }
      }
  }
  }
};
