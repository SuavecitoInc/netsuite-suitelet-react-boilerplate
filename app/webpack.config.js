const path = require('path');

module.exports = (env, argv) => {
  return {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env','@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        },
        {
          test: /.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
  };
};