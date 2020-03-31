const path          = require('path');
const nodeExternals = require('webpack-node-externals');

function createMainProdConfig() {
  return {
    output: {
      path: path.resolve(__dirname, 'build/electron/'),
      publicPath : './',
      filename: `main.bundle.js`
    },
    entry: {
      main: path.join(__dirname, 'app/main/main.js')
    },
    mode: 'production',
    target: 'electron-main',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          loader: 'babel-loader'
        }
      ]
    },
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [
      nodeExternals(),
      {
        sqlite3: 'commonjs sqlite3',
        leveldown: 'commonjs leveldown'
      }
    ]
  };
}

module.exports = createMainProdConfig();
