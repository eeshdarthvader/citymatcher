const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const InterpolateLoaderOptionsPlugin = require("interpolate-loader-options-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const baseConfig = require("./webpack.config");
const paths = require("./paths");

const nodeEnv = process.env.NODE_ENV || "development";
const devConfig = {
  host: "0.0.0.0",
  port: 3000
};

const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    sourceMap: true,
    plugins: [
      require("autoprefixer") //eslint-disable-line
    ]
  }
};

process.noDeprecation = true;

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new DashboardPlugin(),
  new InterpolateLoaderOptionsPlugin({
    loaders: [
      {
        name: "react-svg-loader",
        // 0 is the index of the cleanupIDs plugin in the plugins array.
        include: ["svgo.plugins.0.cleanupIDs.prefix"]
      }
    ]
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: 2,
    filename: "commons.js"
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: ["runtime"]
  }),
  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    children: true
  }),
  new webpack.DefinePlugin({
    "process.env": { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true
  }),
  new HtmlWebpackPlugin({
    template: paths.appHtml,
    production: false,
    inject: true
  }),
  new CopyWebpackPlugin([
    {
      from: paths.appPublic
    }
  ]),
  // This is necessary to emit hot updates (currently CSS only):
  new webpack.HotModuleReplacementPlugin(),
  // If you require a missing module and then `npm install` it, you still have
  // to restart the development server for Webpack to discover it. This plugin
  // makes the discovery automatic so you don"t have to restart.
  new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  new webpack.NamedModulesPlugin(),
  new webpack.NamedChunksPlugin(chunk => {
    if (chunk.name) {
      return chunk.name;
    }
    return chunk.modules
      .map(m => path.relative(m.context, m.request))
      .join("_");
  })
];

const appEntry = [
  // the entry point of our app
  "index"
];

const jsEntry = [
  // activate HMR for React
  "react-hot-loader/patch",

  // bundle the client for hot reloading
  // only- means to only hot reload for successful updates
  "webpack/hot/only-dev-server"
];

module.exports = {
  devtool: "cheap-module-eval-source-map",
  context: baseConfig.context,
  entry: {
    app: appEntry,
    polyfill: baseConfig.entry.polyfill,
    bundle: jsEntry,
    vendor: baseConfig.entry.vendor
  },
  output: {
    path: paths.appPublic,
    pathinfo: true,
    filename: "[name].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js[x]*|[s]*css)$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader?importLoaders=1&sourceMap",
          postCSSLoader
        ],
        include: paths.appSrc,
        exclude: /flexboxgrid/
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } }
        ],
        include: /flexboxgrid/
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader?importLoaders=1&sourceMap",
          postCSSLoader,
          "sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg\ttf|colored\.svg|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: "file-loader"
      },
      {
        test: /^((?!\.colored).)*(\.svg)$/,
        use: [
          "babel-loader",
          {
            loader: "react-svg-loader",
            query: {
              jsx: true,
              es5: false,
              svgo: {
                pretty: true,
                plugins: [
                  { cleanupIDs: { minify: true, prefix: "[name]-" } },
                  { collapseGroups: true },
                  { removeDesc: true },
                  { removeDoctype: true },
                  { removeTitle: true },
                  { removeUselessDefs: true },
                  { removeXMLNS: true },
                  { removeXMLProcInst: true },
                  { removeUselessStrokeAndFill: true },
                  { removeStyleElement: true },
                  { removeAttrs: { attrs: "(fill)" } }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(js[x]*)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true
          }
        }
      }
    ]
  },
  resolve: baseConfig.resolve,
  plugins,
  devServer: {
    contentBase: paths.appSrc,
    disableHostCheck: true,
    overlay: true,
    historyApiFallback: true,
    host: devConfig.host,
    port: devConfig.port,
    stats: "minimal",
    inline: true,
    compress: false,
    open: true
  }
};
