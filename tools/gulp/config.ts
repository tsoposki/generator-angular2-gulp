'use strict';

var gutil = require('gulp-util');

/**
 * Usage:
 * `$ NODE_ENV=<development/production> PORT=<port> gulp <task>`
 */
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
process.env.PORT = process.env.PORT ? process.env.PORT : '9173';

export const env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	get isDev() {
		return this.NODE_ENV === 'development';
	},
	get isProd() {
		return this.NODE_ENV === 'production';
	},
	get paths() { return this.isDev ? envPaths.dev : envPaths.prod; }
};

let baseLibs = [
	'node_modules/systemjs/dist/system.js',
	'node_modules/es6-shim/es6-shim.js',
	'node_modules/rxjs/bundles/Rx.js',
	'node_modules/angular2/bundles/angular2-polyfills.js',
	'node_modules/angular2/bundles/angular2.dev.js',
	'node_modules/angular2/bundles/router.dev.js',
	'node_modules/angular2/bundles/http.dev.js'
];

var envPaths = {
	dev: {
		libs: {
			js: [
				...baseLibs
				// Add dev only libs here - eg 'node_modules/debug-lib/index.js'
			]
		}
	},

	prod: {
		libs: {
			js: [
				...baseLibs
				// Add prod only libs here - eg 'node_modules/analytics-lib/index.js'
			]
		}
	}
};


/**
 *  The main paths of your project handle these with care
 */
var src = './src';
var app = `${src}/app`;
var build = 'build';
var assets = 'assets';
var images = 'images';
var fonts = 'fonts';
var assetsSrc = `${src}/${assets}`;
var assetsBuild = `${build}/${assets}`;
var test = 'test';
export const paths = {
	src: src,
	app: app,
	build: build,
	docs: 'docs',
	coverage: 'coverage',
	karma: '.karma',
	protractor: '.protractor',
	unit: `${test}/unit`,
	e2e: `${test}/e2e`,
	assetsSrc: assetsSrc,
	assetsBuild: assetsBuild,
	fontsSrc: `${assetsSrc}/${fonts}`,
	fontsBuild: `${assetsBuild}/${fonts}`,
	imagesSrc: `${assetsSrc}/${images}`,
	imagesBuild: `${assetsBuild}/${images}`,
	mainStyles: `${app}/styles/main.scss`,
	indexStyles: `${app}/index.scss`,
	indexHtml: `${src}/index.html`,
	buildCss: `${build}/css`,
	buildJs: `${build}/js`,
	buildLibs: `${build}/libs`,
	karmaConf: 'karma.conf.js',
	protractorConf: 'protractor.conf.js',
	coverageConf: 'coverage/json/coverage-js.json'
};

export const selectors = {
	images: '/**/*.{png,jpg,gif}',
	fonts: '**/*.{eot,ttf,otf,woff}',
	scss: '/**/*.scss',
	ts: '/**/*.ts',
	html: '/**/*.html',
	css: '/**/*.css',
	specJs: '/**/*.spec.js'
};

export function errorHandler(title) {
	'use strict';

	return function(err) {
		gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
		this.emit('end');
	};
}
