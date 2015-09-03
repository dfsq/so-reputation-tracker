import {inject} from 'aurelia-framework';
import {UserInfo} from './common/userInfo';

@inject(UserInfo)
export class App {

	constructor(userInfo) {
		this.userInfo = userInfo;
	}

	configureRouter(config, router) {

		const userInfo = this.userInfo;

		config.addPipelineStep('authorize', {
			run: function(routingContext, next) {
				if (routingContext.nextInstructions.some(i => i.config.checkConfig)) {
					return userInfo.getUser().then(function(user) {
						return user && user.id ? next() : next.cancel(router.navigate('config'));
					});
				}
				return next();
			}
		});

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
