import Webpack from 'webpack';
import config from './config';

config.entry = {
  playground: ['webpack/hot/dev-server', './playground/app'],
  'visual-testing': ['webpack/hot/dev-server', './playground/app']
};

config.plugins = config.plugins || [];
config.plugins.push(new Webpack.HotModuleReplacementPlugin());

export default config;
