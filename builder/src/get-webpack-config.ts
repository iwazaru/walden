import { join } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import EventHooksPlugin from 'event-hooks-webpack-plugin';

import { SiteConfig } from './types';
import prepareUserFiles from './prepare-user-files';

// Get local build directory path
const outputPath = join(process.cwd(), '/build');

export default function getWebpackConfig(
  tempDirPath: string,
  siteConfig: SiteConfig,
): webpack.Configuration {
  return {
    mode: 'development',
    entry: join(tempDirPath, '/index.js'),
    output: {
      filename: 'main.js',
      path: outputPath,
      publicPath: '/',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        templateContent: `<html>
    <head>
      <title>${siteConfig.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>`,
      }),
      // Run preareUserFiles function before every build
      // and when user file changes in watch mode
      new EventHooksPlugin({
        beforeRun: () => prepareUserFiles(tempDirPath),
        watchRun: () => prepareUserFiles(tempDirPath),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.jpg$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    },
    devtool: 'source-map',
    stats: {
      all: false,
      colors: true,
      assets: true,
      performance: true,
      publicPath: true,
      timings: true,
      warnings: true,
      errors: true,
      errorDetails: true,
    },
  };
}