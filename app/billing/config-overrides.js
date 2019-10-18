const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const appIncludes = [
  resolveApp('src'),
  resolveApp('../../shared/components/src'),
  resolveApp('../../shared/common/src'),
  resolveApp('../main/src'),
]

fs.readdir(resolveApp('../../module'), function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    appIncludes.push(resolveApp(`../../module/${file}/src`));
  });
});

module.exports = function override(config) {
  config.resolve.alias['deepmerge$'] = 'deepmerge/dist/umd.js'

  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin',
  )

  config.module.rules[0].include = appIncludes
  config.module.rules[1] = null
  config.module.rules[2].oneOf[1].include = appIncludes
  config.module.rules = config.module.rules.filter(Boolean)

  config.target = 'electron-renderer'

  return config
}
