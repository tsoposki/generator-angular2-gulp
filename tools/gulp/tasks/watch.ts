import {join} from "path";
'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

import {paths, selectors} from '../config';
import {styles, ts, index} from '../tasks';

export function watch() {
	gulp.watch([
		join(paths.app, selectors.ts)
	], ts);
	gulp.watch([
		join(paths.app, selectors.scss)
	], styles);
	gulp.watch(paths.indexHtml, index);
	gulp.watch([
		join(paths.app, selectors.html),
		join(paths.app, selectors.css)
	], (e) => plugins.connect.reload());
}
