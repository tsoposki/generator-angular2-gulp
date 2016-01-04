import {index} from './tasks/index';
import {server} from './tasks/server';
import {styles} from './tasks/styles';
import {ts, typedoc} from './tasks/ts';
import {watch} from './tasks/watch';
import {assets} from './tasks/assets';
import {clean} from './tasks/clean';
import {karmaClean, karmaRemapCoverage, karmaRun, karmaTs, karmaTsSpec, karmaTsSrc} from './tasks/unit-tests';
import {protractorClean, protractorRun, protractorTsSpec, protractorUpdate} from './tasks/e2e-tests';


export {
	index,
	server,
	styles,
	ts,
	typedoc,
	watch,
	assets,
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
}
