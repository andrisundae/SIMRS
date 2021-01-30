const { readdirSync, copyFileSync } = require('fs');
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
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
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
          getPackageSources('../../module'),
          path.join(__dirname, '../main')
        );
      }

      const srcDir = path.resolve(__dirname + '/src');
      if (process.env.BROWSER && 'none' === process.env.BROWSER) {
        webpackConfig.target = 'electron-renderer';
        copyFileSync(srcDir + '/index.desktop.js', srcDir + '/index.js');
      } else {
        copyFileSync(srcDir + '/index.mobile.js', srcDir + '/index.js');
      }

      return webpackConfig;
    },
  },
};
