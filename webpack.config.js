import path from 'path';

export default {
  mode: 'development',
  entry: './payment.js', // Your main JS file
  output: {
    filename: 'bundle.js', // Output file
    path: path.resolve(process.cwd(), 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
