const webpack = require('webpack');

module.exports = {
	webpack: {
		configure: (webpackConfig) => {
			webpackConfig.resolve.fallback = {
				...webpackConfig.resolve.fallback,
				"crypto": require.resolve("crypto-browserify"),
				"buffer": require.resolve("buffer"),
				"stream": require.resolve("stream-browserify")
			};
			webpackConfig.plugins = (webpackConfig.plugins || []).concat([
				new webpack.ProvidePlugin({
					Buffer: ['buffer', 'Buffer'],
					process: 'process/browser'
				})
			]);
			return webpackConfig;
		}
	}
};
