const path          = require('path');
const createDevConfig     = require('./webpack.dev.config');

function createRendererDevConfig() {
    const electronDevConfig = createDevConfig({ electron: true });
    electronDevConfig.target = 'electron-renderer';
    electronDevConfig.output = {
      path: path.resolve(__dirname, 'build/electron-dev'),
      filename: `renderer.bundle.js`,
      publicPath: './'
    };
    return electronDevConfig;
}

module.exports = createRendererDevConfig();
