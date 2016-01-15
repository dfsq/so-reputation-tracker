import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Configuration } from './common/configuration';

@inject(Router, Configuration)
export class App {

	// https://github.com/aurelia/router/issues/60#issuecomment-101421389
	constructor(router, configuration) {
		this.configuration = configuration.get();
	}

	configureRouter(config, router) {

		const user = this.configuration.userId;

		config.title = 'Stackoverflow Reputation Tracker';

		config.addPipelineStep('authorize', {
			run: function(navigationInstruction, next) {
				if (navigationInstruction.getAllInstructions().some(i => i.config.checkConfig)) {
					if (!user) {
						return next.cancel(router.navigate('config'));
					}
				}
				return next();
			}
		});

		config.map([
			{
				route: 'config',
				name: 'config',
				moduleId: './config/config',
				title: 'Config'
			},
			{
				route: 'stats/:userId/:startDate',
				name: 'stats',
				moduleId: './stats/stats',
				title: 'Statistics',
				checkConfig: true
			},
			{route: '', redirect: 'stats'}
		]);

		config.mapUnknownRoutes(instruction => './config/config');
	}
}
