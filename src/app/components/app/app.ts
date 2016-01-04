import {Component} from 'angular2/core';
import {View} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

@Component({
	selector: 'app'
})
@View({
	templateUrl: './components/app/app.html'
})

export class App {
	name: string;

	constructor() {
		this.name = 'Sexy Chicka';

		Observable.fromArray([1, 2, 3])
		.subscribe((num: number) => console.log(num));
	}
}
