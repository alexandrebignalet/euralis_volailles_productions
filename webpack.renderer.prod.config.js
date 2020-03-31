const path          = require('path');
const createProdConfig     = require('./webpack.prod.config');

function createRendererProdConfig() {
    const electronProdConfig = createProdConfig({ electron: true });
    electronProdConfig.target = 'electron-renderer';
    electronProdConfig.output = {
      path: path.resolve(__dirname, 'build/electron'),
      filename: `renderer.bundle.js`,
      publicPath: './'
    };
    return electronProdConfig;
}

module.exports = createRendererProdConfig();
