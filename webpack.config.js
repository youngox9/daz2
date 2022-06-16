const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const setPath = function (folderName) {
  return path.join(__dirname, folderName);
}

const config = {
  entry: {
    vendor: ['babel-polyfill', './src/index.js'],
  },
  resolveLoader: {
    modules: [setPath('node_modules')]
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
        name: 'vendor'
    }
  },
  performance: {
    hints: false
  },
  // mode: 'production',
  // mode: 'development',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new UglifyJSPlugin({
      uglifyOptions:{
        // sourceMap:true,
        compress: true,
        inline:3
      } 
    }),
  ],
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader"
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  grid: true,
                  browsers: [
                    "> 1%",
                    "ie 10"
                  ]
                })
              ]
            },
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
        }]
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-sprite-loader'
      // },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   loader: 'file-loader'
      // }    
    ]
  },
  watch: true,
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  }
};
module.exports = config;