import { inject } from 'aurelia-framework';
import { useView } from 'aurelia-templating';
import { Router } from 'aurelia-router';
import { Configuration } from '../common/configuration';

@inject(Router, Configuration)
@useView('./config/config.html')
export class ConfigVM {

	error  = {};

	datepickerConfig = {
		minDate: new Date(2010, 0, 1),
		maxDate: new Date(),
		yearRange: [2011, new Date().getFullYear()],
		format: 'YYYY-MM-DD'
	};

	constructor(router, configuration) {

		document.body.className = 'config-screen';

		this.router = router;
		this.config = configuration;

		this.model = this.config.get();
	}

	save() {

		if (!this.model.userId || !this.model.startDate) {
			['userId', 'startDate'].forEach(field => this.error[field] = !this.config[field]);
		}

		this.config.set({
			userId: this.model.userId,
			startDate: this.model.startDate
		});

		this.router.navigateToRoute('stats', {userId: this.model.userId, startDate: this.model.startDate});
	}
}
