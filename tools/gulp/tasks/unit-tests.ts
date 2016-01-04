const gulp = require('gulp');

import * as del from 'del';
import {join, resolve} from 'path';
import {selectors, env, paths} from '../config';

const karma = require('karma');
const plugins = require('gulp-load-plugins')();
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

export function karmaClean() {
	return del(['.karma']);
}

export function karmaTs(root) {
	var karmaTsProject = plugins.typescript.createProject('tsconfig.json', {
		typescript: require('typescript')
	});

	//var caller = arguments.callee.caller.name;

	var tsResult = gulp.src(join(root, selectors.ts))
		.pipe(plugins.preprocess({context: env}))
		.pipe(plugins.inlineNg2Template({base: root}))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.typescript(karmaTsProject));

	return tsResult.js
		.pipe(plugins.sourcemaps.write({sourceRoot: join(__dirname, root)}))
		//.pipe(plugins.size({title: caller}))
		.pipe(gulp.dest(join(paths.karma, root)));
}


export function karmaTsSrc() {
	return karmaTs(paths.app);
}

export function karmaTsSpec() {
	return karmaTs(paths.app);
}

export function karmaRun(done) {
	return new karma.Server({
		configFile: join(resolve(__dirname, '..', '..', '..'), paths.karmaConf)
	}, done).start();
}

export function karmaRemapCoverage() {
	return gulp.src(paths.coverageConf)
		.pipe(remapIstanbul({
			reports: {
				json: 'coverage/json/coverage-ts.json',
				html: 'coverage/html-report'
			}
	}));
}
