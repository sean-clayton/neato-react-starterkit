require('babel-register')

const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config/')
const _debug = require('debug')
const postcssImport = require('postcss-import')
const precss = require('precss')
const path = require('path')

const debug = _debug('app:webpack:config')
const {__DEV__, __PROD__, __TEST__} = config.globals

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    root: '/src',
    extensions: ['', '.js', '.jsx']
  },
  module: {},
  modulesDirectories: ['src', 'node_modules'],
  stats: {
    colors: true,
    reasons: true
  }
}

const APP_ENTRY_PATH = './src/main'

webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY_PATH, 'webpack-hot-middleware/client?path=/__webpack_hmr']
    : [APP_ENTRY_PATH],
  vendor: config.vendor_packages
}

webpackConfig.output = {
  filename: '[name].[hash].js',
  path: path.join(__dirname, '/dist'),
  publicPath: path.join(__dirname, '/')
}

webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/') + '/index.html',
    hash: false,
    favicon: path.resolve(__dirname, '../src/static') + '/favicon.ico',
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}
else if (__PROD__) {
  debug('Apply UglifyJS plugin.')
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        drop_console: true,
        screw_ie8: true,
        drop_debugger: true,
        hoist_funs: true,
        evaluate: true,
        comparisons: true,
        properties: true,
        warnings: false
      }
    })
  )
}

if (!__TEST__) {
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  }))
}

if (!__PROD__) {
  webpackConfig.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    loader: 'eslint',
    exclude: /node_modules/
  }]

  webpackConfig.eslint = {
    configFile: './.eslintrc',
    emitWarning: __DEV__
  }
}

webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    cacheDirectory: true,
    presets: __DEV__
      ? ['es2015', 'react', 'stage-0', 'react-hmre']
      : ['es2015', 'react', 'stage-0', 'react-optimize']
  }
},
{
  test: /\.json$/,
  loader: 'json'
}]

// Styles
const cssLoader = !config.compiler_css_modules
  ? 'css?sourceMap'
  : [
    'css?modules',
    'sourceMap',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&')

webpackConfig.module.loaders.push({
  test: /\.postcss$/,
  include: /src/,
  loaders: [
    'style',
    cssLoader,
    'postcss'
  ]
})

webpackConfig.module.loaders.push({
  test: /\.postcss$/,
  exclude: /src/,
  loaders: [
    'style',
    'css?sourceMap',
    'postcss'
  ]
})

webpackConfig.module.loaders.push({
  test: /\.*.global.postcss$/,
  loaders: [
    'style',
    'css?sourceMap',
    'postcss'
  ]
})

webpackConfig.postcss = [
  postcssImport({
    root: process.cwd(),
    path: `${process.cwd()}/node_modules`
  }),
  precss(),
  cssnano({
    sourcemap: true,
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['ie >= 10', 'last 2 versions']
    },
    safe: true,
    discardComments: {
      removeAll: true
    }
  })
]

// File loaders
webpackConfig.module.loaders.push({
  test: /\.(jpe?g|png|gif|svg)$/i,
  loaders: [
    'file?hash=sha512&digest=hex&name=[hash].[ext]',
    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
  ]
})

if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter(loader =>
    loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
  ).forEach(loader => {
    const [first, ...rest] = loader.loaders
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    })
  )
}

module.exports = webpackConfig