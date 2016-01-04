import * as gulp from 'gulp';

import {env, paths, selectors} from '../config';
import merge = require("merge-stream");

const plugins = require('gulp-load-plugins')();

export function assets() {
	var images = gulp.src(`${paths.imagesSrc}/${selectors.images}`)
		.pipe(plugins.size({ title: 'images' }))
		.pipe(gulp.dest(paths.imagesBuild));

	var fonts = gulp.src(`${paths.fontsSrc}/${selectors.fonts}`)
		.pipe(plugins.size({ title: 'fonts' }))
		.pipe(gulp.dest(paths.fontsBuild));

	var libs = gulp.src(env.paths.libs.js, { base: '.' })
		.pipe(plugins.if(env.isProd, plugins.concat('libs.js')))
		.pipe(plugins.if(env.isProd, plugins.uglify()))
		.pipe(plugins.size({ title: 'libs' }))
		.pipe(gulp.dest(paths.buildLibs));

	return merge(images, fonts, libs);
}
