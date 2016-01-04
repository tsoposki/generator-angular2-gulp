import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';


import {App} from './components/app/app';

// @if isProd
enableProdMode();
// @endif

bootstrap(App, [

]);
