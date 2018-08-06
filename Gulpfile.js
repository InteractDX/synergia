(function() {
	'use strict';

	var os = require('os');
	var gulp = require('gulp');
	var gutil = require("gulp-util");
	var webpack = require('webpack');
	var WebpackDevServer = require("webpack-dev-server");
	var webpackConfig = require("./webpack.config.js");
	var open = require('gulp-open');
	var vendor = require('gulp-concat-vendor');
	var browser = os.platform() === 'linux' ? 'google-chrome' : (
		os.platform() === 'darwin' ? 'google chrome' : (
			os.platform() === 'win32' ? 'chrome' : 'firefox'));


	// Start a webpack-dev-server
	gulp.task("webpack-dev-server", function(callback) {
		// modify some webpack config options
		var myConfig = Object.create(webpackConfig);

		// Start a webpack-dev-server
		new WebpackDevServer(webpack(myConfig), {
			publicPath: "/" + myConfig.output.publicPath,
			stats: {
				colors: true
			}
		}).listen(8080, "localhost", function(err) {
			if (err) throw new gutil.PluginError("webpack-dev-server", err);
			gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
		});
	});

	//concat the vendor js files and genrate vendor.js
	gulp.task('carousalvendor', function() {
		gulp.src('./node_modules/react-responsive-carousel/lib/**/*.js')
			.pipe(vendor('carousalvendor.js'))
			.pipe(gulp.dest('./dist/vendor'));
	});

	// gulp.task('start', ['webpack-dev-server']);

})();