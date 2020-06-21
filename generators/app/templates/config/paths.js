const resolveApp = require('./resolveApp');

module.exports = {
  app: resolveApp('src/index.js'),
  dist: resolveApp('dist'),
  indexHtml: resolveApp('public/index.html'),
  nodeModules: resolveApp('node_modules'),
  public: resolveApp('public'),
  publicUrl: '/',
  src: resolveApp('src'),
  vendor: resolveApp('src/vendor.js'),
  versionFile: resolveApp('dist/version.json'),
  versionTemplateFile: resolveApp('config/version.ejs'),
};
