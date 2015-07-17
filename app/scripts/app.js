import {Redirect} from 'aurelia-router';

export class App {

	configureRouter(config, router) {
		config.map([
			{route: 'config', name: 'config', moduleId: './config/config', nav: true, title: 'Config'},
			{route: 'stats', name: 'stats', moduleId: './stats/stats', nav: true, title: 'Reputation Stats'},
			{route: '', redirect: 'stats'}
		]);
	}
}
