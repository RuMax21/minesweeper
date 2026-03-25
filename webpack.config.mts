import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { type Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';
interface EnvVariables {
  mode: Mode;
  port: number;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.svg$/,
          type: 'asset/resource',
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
    devServer: {
      port: env.port ?? 5000,
      open: true,
    },
    devtool: 'source-map'
  };

  return config;
};
