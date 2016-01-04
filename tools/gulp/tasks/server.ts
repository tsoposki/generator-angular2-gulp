const plugins			= require('gulp-load-plugins')();
const history			= require('connect-history-api-fallback');

import {env, paths} from '../config';


export function server() {
	return plugins.connect.server({
		root: paths.build,
		livereload: env.isDev,
		port: env.PORT,
		middleware: (connect, opt) => [history()]
	});
}
