const { readdirSync } = require('fs');
const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');

function getPackageSources(relativePath) {
  return readdirSync(relativePath, { withFileTypes: true })
    .filter((dirent) => {
      return dirent.isDirectory();
    })
    .map((dirent) => {
      return path.join(__dirname, relativePath, dirent.name, 'src');
    });
}

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('babel-loader')
      );

      if (isFound) {
        const loaderInclude = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = Array.prototype.concat(
          loaderInclude,
          getPackageSources('../../shared'),
          getPackageSources('../../module')
        );
      }

      webpackConfig.target = 'electron-renderer';

      return webpackConfig;
    },
  },
};
