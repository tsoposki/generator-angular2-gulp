'use strict';

const gulp = require('gulp');

import {
	styles,
	ts,
	typedoc,
	assets,
	index,
	watch,
	server,
	clean,
	karmaClean,
	karmaRemapCoverage,
	karmaRun,
	karmaTs,
	karmaTsSpec,
	karmaTsSrc,
	protractorClean,
	protractorRun,
	protractorTsSpec,
	protractorUpdate
} from './tools/gulp/tasks';

/**
 * Usage:
 * `$ NODE_ENV=<development/production> PORT=<port> gulp <task>`
 */

gulp.task('build', gulp.series(
	clean,
	gulp.parallel(styles, ts),
	assets,
	index,
	typedoc
));

gulp.task('serve', gulp.series(
	gulp.parallel(watch, server)
));

gulp.task('unit', gulp.series(
	karmaClean,
	karmaTsSrc,
	karmaTsSpec,
	karmaRun,
	karmaRemapCoverage,
	karmaClean
));

gulp.task('e2e', gulp.series(
	protractorClean,
	protractorTsSpec,
	protractorUpdate,
	protractorRun,
	protractorClean
));
