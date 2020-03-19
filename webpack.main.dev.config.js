const path          = require('path');
const nodeExternals = require('webpack-node-externals');

function createMainDevConfig() {
  return {
    output: {
      path: path.resolve(__dirname, 'build/electron-dev'),
      publicPath : '/',
      filename: `main.bundle.js`
    },
    mode: 'development',
    entry: {
      main: path.join(__dirname, 'app/main/main.js')
    },
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

module.exports = createMainDevConfig();
