const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//.BundleAnalyzerPlugin;
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const path = require("path");
const InterpolateLoaderOptionsPlugin = require("interpolate-loader-options-webpack-plugin");

const baseConfig = require("./webpack.config");
const paths = require("./paths");

const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    sourceMap: true,
    plugins: loader => {
      return [
        require("autoprefixer") // eslint-disable-line
      ];
    }
  }
};

process.noDeprecation = true;

module.exports = function webpackConfig(env) {
  env = "production";
  const jsEntry = [paths.appIndexJs];
  const ENVIRONMENT = env.development ? "development" : "production";

  console.log(`Running webpack in ${ENVIRONMENT} environment.`);
  const devTools = "cheap-module-source-map";
  const pathsToClean = [
    "build/index.html",
    "build/cityWatcher-static/css",
    "build/cityWatcher-static/js"
  ];
  let commonPlugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new InterpolateLoaderOptionsPlugin({
      loaders: [
        {
          name: "react-svg-loader",
          // 0 is the index of the cleanupIDs plugin in the plugins array.
          include: ["svgo.plugins.0.cleanupIDs.prefix"]
        }
      ]
    }),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(ENVIRONMENT)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.modules
        .map(m => path.relative(m.context, m.request))
        .join("_");
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 3,
      children: true,
      async: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ];

  const prodPlugins = [
    new webpack.IgnorePlugin(/redux-logger/),
    new CleanWebpackPlugin(pathsToClean, {
      root: paths.appRoot
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: 2,
      filename: "cityWatcher-static/js/[name].[chunkhash:8].js"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "runtime"
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      mangle: true,
      debug: false,
      minimize: true,
      compress: {
        drop_console: true,
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      sourceMap: devTools
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      as: "script",
      include: ["vendor", "app"],
      fileBlacklist: [/\.map/]
    }),
    new PreloadWebpackPlugin({
      rel: "prefetch",
      as: "script",
      fileBlacklist: [/\.map/, /vendor/, /app/]
    }),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new ExtractTextPlugin("cityWatcher-static/css/styles.[chunkhash:8].css")
    /* new CompressionPlugin({
      asset: "[path][query]",
      algorithm: "gzip",
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }) */
  ];

  const devPlugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: 2,
      filename: "cityWatcher-static/js/[name].js"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "runtime"
    })
  ];

  let commonRules = [
    {
      test: /\.(gif|png|jpg|jpeg\ttf|colored\.svg|eot|woff(2)?)(\?[a-z0-9]+)?$/,
      use: [
        {
          loader: "file-loader",
          options: {
            outputPath: "cityWatcher-static/assets/"
          }
        }
      ]
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
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          query: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true
          }
        }
      ]
    }
  ];

  const devRules = [
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
        "postcss-loader"
      ]
    },
    {
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader?importLoaders=1&sourceMap",
        "sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
      ]
    }
  ];

  const prodRules = [
    {
      test: /\.(s*)css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: true,
              localIdentName: "[local]"
            }
          },
          postCSSLoader,
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      })
    }
  ];

  if (env.production) {
    commonPlugins = commonPlugins.concat(prodPlugins);
    commonRules = commonRules.concat(prodRules);
  } else {
    commonRules = commonRules.concat(devRules);
    commonPlugins = commonPlugins.concat(devPlugins);
  }

  return {
    devtool: devTools,
    context: baseConfig.context,
    entry: {
      app: jsEntry,
      polyfill: baseConfig.entry.polyfill,
      vendor: baseConfig.entry.vendor
    },
    output: {
      path: paths.appBuild,
      filename: `cityWatcher-static/js/[name]${
        env.development ? "" : ".[chunkhash:8]"
      }.js`,
      chunkFilename: `cityWatcher-static/js/[name]${
        env.development ? "" : ".[chunkhash:8]"
      }.js`,
      publicPath: "/"
    },
    module: {
      rules: commonRules
    },
    resolve: baseConfig.resolve,
    plugins: commonPlugins
  };
};
