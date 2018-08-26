const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const paths = require("./paths");
const path = require("path");
const base = require("./webpack.config");
const InterpolateLoaderOptionsPlugin = require("interpolate-loader-options-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");

const PUBLIC_PATH = "/";
// Get environment variables to inject into our app.
const config = { ...base };
const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    sourceMap: true,
    plugins: [
      require("autoprefixer") //eslint-disable-line
    ]
  }
};

require.extensions[".css"] = () => {};

require("css-modules-require-hook")({
  generateScopedName: "[name]__[local]___[hash:base64:5]",
  extensions: [".scss", ".css"],
  camelCase: "dashes"
});

config.target = "node";
config.devtool = "cheap-module-eval-source-map";
config.entry = "../server/";
config.externals = [nodeExternals({ whitelist: [/\.css$/] })]; // / in order to ignore all modules in node_modules folder
config.output = {
  path: paths.serverBuild,
  filename: "[name].js",
  publicPath: PUBLIC_PATH
};

config.plugins = [
  new CopyWebpackPlugin([
    {
      from: path.join(paths.appRoot, "package.json"),
      to: path.join(paths.appBuild)
    }
  ]),
  new CopyWebpackPlugin([
    {
      from: path.join(paths.appRoot, "yarn.lock"),
      to: path.join(paths.appBuild)
    }
  ]),
  new CleanWebpackPlugin([paths.serverBuild, "build/package.json"], {
    root: paths.appRoot
  }),
  new webpack.DefinePlugin({
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null,

    __DEVTOOLS__: true,
    window: null,
    google: undefined,
    document: undefined,
    __LOCAL__: false
  }),
  new InterpolateLoaderOptionsPlugin({
    loaders: [
      {
        name: "react-svg-loader",
        // 0 is the index of the cleanupIDs plugin in the plugins array.
        include: ["svgo.plugins.0.cleanupIDs.prefix"]
      }
    ]
  }),
  new webpack.optimize.CommonsChunkPlugin({ async: true, children: true }),
  new webpack.NamedModulesPlugin(),
  new webpack.NamedChunksPlugin(chunk => {
    if (chunk.name) {
      return chunk.name;
    }
    return chunk.modules
      .map(m => {
        const pathComponents = m.request.split("/");
        return pathComponents[pathComponents.length - 1];
      })
      .join("_");
  })
];

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    parallel: true,
    sourceMap: true,
    compress: {
      screw_ie8: true,
      warnings: false
    },
    mangle: {
      screw_ie8: true
    },
    output: {
      comments: false,
      screw_ie8: true
    }
  })
);

config.module = {
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
      include: /src/,
      exclude: /flexboxgrid/
    },
    {
      test: /\.css$/,
      use: [{ loader: "css-loader/locals", options: { modules: true } }],
      include: /flexboxgrid/
    },
    {
      test: /\.scss$/,
      use: [
        "isomorphic-style-loader",
        "style-loader",
        "css-loader?importLoaders=1&sourceMap",
        postCSSLoader,
        "sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
      ]
    },
    {
      test: /\.(gif|png|jpg|jpeg\ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
      use: "file-loader"
    },
    {
      test: /\.colored\.svg/,
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
                {
                  cleanupIDs: false
                },
                {
                  collapseGroups: false
                },
                {
                  removeDesc: false
                },
                {
                  removeDoctype: false
                },
                {
                  removeTitle: false
                },
                {
                  removeUselessDefs: false
                },
                {
                  removeXMLNS: true
                },
                {
                  removeXMLProcInst: false
                },
                {
                  removeUselessStrokeAndFill: false
                },
                {
                  removeStyleElement: false
                }
              ]
            }
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
            svgo: {
              pretty: true,
              plugins: [
                {
                  cleanupIDs: {
                    minify: true,
                    prefix: "[name]-"
                  }
                },
                {
                  collapseGroups: true
                },
                {
                  removeDesc: true
                },
                {
                  removeDoctype: true
                },
                {
                  removeTitle: true
                },
                {
                  removeUselessDefs: true
                },
                {
                  removeXMLNS: true
                },
                {
                  removeXMLProcInst: true
                },
                {
                  removeUselessStrokeAndFill: true
                },
                {
                  removeStyleElement: true
                },
                {
                  removeAttrs: {
                    attrs: "(fill)"
                  }
                }
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
          // This is a feature of `babel-loader` for webpack (not Babel itself). It
          // enables caching results in ./node_modules/.cache/babel-loader/ directory for
          // faster rebuilds.
          cacheDirectory: true
        }
      }
    }
  ]
};

module.exports = config;
