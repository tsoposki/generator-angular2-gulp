import * as gulp from 'gulp';
import {join, resolve} from 'path';

import {env, paths, selectors} from '../config';
const plugins		= require('gulp-load-plugins')();

var tsProject = plugins.typescript.createProject('tsconfig.json', {
	typescript: require('typescript'),
	outFile: env.isProd ? 'app.js' : undefined
});


export function ts() {
	var tsResult = gulp.src(join(paths.app, selectors.ts))
		.pipe(plugins.changed(paths.buildJs))
		.pipe(plugins.tslint())
		.pipe(plugins.tslint.report('verbose'))
		.pipe(plugins.preprocess({ context: env }))
		.pipe(plugins.inlineNg2Template({ base: paths.app }))
		.pipe(plugins.if(env.isDev, plugins.sourcemaps.init()))
		.pipe(plugins.typescript(tsProject));

	return tsResult.js
		.pipe(plugins.if(env.isProd, plugins.uglify()))
		.pipe(plugins.if(env.isDev, plugins.sourcemaps.write({
			sourceRoot: join(resolve(__dirname, '..', '..', '..'), paths.app)
		})))
		.pipe(plugins.size({ title: 'ts' }))
		.pipe(gulp.dest(paths.buildJs))
		.pipe(plugins.connect.reload());
}

export function typedoc() {
	return gulp.src(`${paths.app}/${selectors.ts}`)
		.pipe(plugins.typedoc({
			module: 'commonjs',
			target: 'es5',
			experimentalDecorators: true,
			out: 'docs'
		}));
}
