'use strict';

import * as gulp from 'gulp';
import {join} from 'path';

import {env, paths} from '../config';

const plugins = require('gulp-load-plugins')();

export function index() {
	var css = `${paths.buildCss}/*`;
	var libs = (
		env.isProd ?
			`${paths.buildLibs}/*` :
			env.paths.libs.js.map(lib => join(paths.buildLibs, lib))
	);

	var source = gulp.src([].concat(css, libs), {read: false});

	return gulp.src(paths.indexHtml)
		.pipe(plugins.inject(source, {ignorePath: paths.build}))
		.pipe(plugins.preprocess({context: env}))
		.pipe(gulp.dest(paths.build))
		.pipe(plugins.connect.reload());
}
