import * as del from 'del';
import {paths} from '../config';

export function clean() {
	return del([
		paths.docs,
		paths.coverage,
		paths.build,
		paths.karma,
		paths.protractor
	]);
}
