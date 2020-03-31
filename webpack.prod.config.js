const path = require('path');
const createBaseConfig = require('./webpack.config');

module.exports = function (env = {}) {
  const prodConfig = createBaseConfig(env);
  prodConfig.mode = 'production';
  prodConfig.output.path = path.resolve(__dirname, 'build/web/');
  return prodConfig;
};

