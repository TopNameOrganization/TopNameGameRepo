/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  externalsPresets: {
    node: true
  },
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  externals: [
    nodeExternals({
      additionalModuleDirs: [
        '../../node_modules',
        '../client/node_modules'
      ]
    })
  ],
  mode: 'production',
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, "tsconfig.prod.json")
        }
      }],
    }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '..', '..', 'dist', 'server'),
  },
};