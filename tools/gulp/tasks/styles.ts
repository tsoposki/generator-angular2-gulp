'use strict';

import * as gulp from 'gulp';
import {join} from 'path';

import {env, paths, selectors, errorHandler} from '../config';

const plugins = require('gulp-load-plugins')();


export function styles() {
	var sassOptions = {
		style: 'expanded',
		includePaths: [paths.app]
	};

	var injectFiles = gulp.src([
		join(paths.app, selectors.scss),
		'!' + paths.indexStyles,
		'!' + paths.mainStyles,
		join('!' + paths.app, '/**/_*.scss')
	], { read: false });

	var injectOptions = {
		transform: function(filePath) {
			filePath = filePath.replace(`${paths.app}/`, '');
			return '@import "' + filePath + '";';
		},
		starttag: '// injector',
		endtag: '// endinjector',
		addRootSlash: false
	};

	return gulp.src(paths.mainStyles)
		.pipe(plugins.changed(paths.buildCss))
		.pipe(plugins.inject(injectFiles, injectOptions))
		.pipe(plugins.sassLint({ config: '.sass-lint.yml' }))
		.pipe(plugins.sassLint.format())
		.pipe(plugins.sassLint.failOnError())
		.pipe(plugins.rename({ dirname: '' }))
		.pipe(plugins.if(env.isDev, plugins.sourcemaps.init()))
		.pipe(plugins.sass(sassOptions))
			.on('error', errorHandler('Sass'))
		.pipe(plugins.autoprefixer())
			.on('error', errorHandler('Autoprefixer'))
		.pipe(plugins.if(env.isDev, plugins.sourcemaps.write()))
		.pipe(plugins.size({ title: 'sass' }))
		.pipe(gulp.dest(paths.buildCss))
		.pipe(plugins.connect.reload());
}
