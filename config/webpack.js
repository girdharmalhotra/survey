const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
    data: '@import "./app/src/theme/variables.scss";', // Injects global sass variables into all sass modules
    includePaths: [path.join(__dirname, '/../node_modules')]
  }
};

const resolveUrlLoader = {
  loader: 'resolve-url-loader',
  options: {
    sourceMap: true,
    keepQuery: true
  }
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
};

module.exports = {
  entry: './app/src/',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../app/dist')
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=react,presets[]=stage-3&plugins[]=react-html-attrs,plugins[]=transform-class-properties,plugins[]=transform-decorators-legacy',
      },
      {
        test: /(\.s?css)$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ cssLoader, resolveUrlLoader, sassLoader ]
        })
      },
      {
        test: /\.(eot|svg|jpg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
    alias: {
      theme: path.resolve(__dirname, '../app/src/theme'),
      actions: path.resolve(__dirname, '../app/src/actions'),
      components: path.resolve(__dirname, '../app/src/components'),
      reducers: path.resolve(__dirname, '../app/src/reducers'),
      views: path.resolve(__dirname, '../app/src/views'),
      store: path.resolve(__dirname, '../app/src/store.js')
    }
  },
  // customize the webpack "build" cli output...
  stats: {
    assets: true,
    children: false,
    chunks: false,
    colors: false,
    errors: true,
    errorDetails: true,
    hash: true,
    modules: false,
    performance: false,
    version: false
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
  ]
}
