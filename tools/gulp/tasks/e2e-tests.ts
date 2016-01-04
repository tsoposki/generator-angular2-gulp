const gulp = require('gulp');
import * as del from 'del';

import {join, resolve} from 'path';
import {selectors, env, paths} from '../config';

const plugins			= require('gulp-load-plugins')();
const webdriver		= require('gulp-protractor').webdriver_update;


export function protractorClean() {
	return del([paths.protractor]);
}

var protractorTsProject = plugins.typescript.createProject('tsconfig.json', {
	typescript: require('typescript'),
	module: 'commonjs'
});

export function protractorTsSpec() {
	var tsResult = gulp.src(`${paths.e2e}/${selectors.ts}`)
		.pipe(plugins.typescript(protractorTsProject));

	return tsResult.js
		.pipe(plugins.size({title: 'protractorTsSpec'}))
		.pipe(gulp.dest(`${paths.protractor}/${paths.e2e}`));
}

export function protractorUpdate(done) {
	webdriver({}, done);
}

export function protractorRun() {
	return gulp.src(`${paths.protractor}/${paths.e2e}/${selectors.specJs}`)
		.pipe(plugins.protractor.protractor({
			configFile: join(resolve(__dirname, '..', '..', '..'), paths.karmaConf)
		}))
		.on('error', e => {
			throw e
		})
}
