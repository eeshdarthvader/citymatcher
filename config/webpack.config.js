const path = require("path");
const paths = require("./paths");

module.exports = {
  context: paths.appSrc,
  entry: {
    polyfill: paths.polyfill,
    vendor: ["prop-types", "react-router", "redux", "react-redux", "axios"]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [paths.appSrc, "node_modules"],
    alias: {
      Lib: path.resolve(paths.appSrc, "lib/"),
      Components: path.resolve(paths.appSrc, "components/"),
      Constants: path.resolve(paths.appSrc, "constants/"),
      Containers: path.resolve(paths.appSrc, "containers/"),
      Pages: path.resolve(paths.appSrc, "pages/"),
      Reducers: path.resolve(paths.appSrc, "reducers/"),
      Styles: path.resolve(paths.appSrc, "styles/"),
      Utils: path.resolve(paths.appSrc, "utils/"),
      Root: path.resolve(paths.appRoot)
    }
  }
};
