import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {Storage} from './common/storage';

@inject(Storage)
export class App {

	constructor(storage) {
		this.storage = storage;
	}

	configureRouter(config, router) {
		config.addPipelineStep('authorize', CheckConfigStep);
		config.map([
			{route: 'config', name: 'config', moduleId: './config/config', nav: true, title: 'Config'},
			{route: 'stats', name: 'stats', moduleId: './stats/stats', nav: true, title: 'Reputation Stats', checkConfig: true},
			{route: '', redirect: 'stats'}
		]);
		config.mapUnknownRoutes(instruction => {
			router.navigate('config');
		});
	}
}

class CheckConfigStep {
	run(routingContext, next) {
		if (routingContext.nextInstructions.some(i => i.config.checkConfig)) {
			var hasConfig = false;
			if (!hasConfig) {
				return next.cancel(new Redirect('config'));
			}
		}
		return next();
	}
}
