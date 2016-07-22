import { inject } from 'aurelia-framework';
import { useView } from 'aurelia-templating';
import { Router } from 'aurelia-router';
import { Configuration } from '../common/configuration';
import { DATE_FORMAT } from '../common/constants'
import 'moment';

@inject(Router, Configuration)
@useView('./config/config.html')
export class ConfigVM {

	error  = {};

	datepickerConfig = {
		minDate: new Date(2010, 0, 1),
		maxDate: new Date(),
		yearRange: [2011, new Date().getFullYear()],
		format: 'DD MMMM YYYY'
	};

	constructor(router, configuration) {

		document.body.className = 'config-screen';

		this.router = router;
		this.configuration = configuration;

		this.model = this.configuration.get();

		// DEBUG
		if (!this.model || !this.model.profile || !this.model.userId) {
			this.model = {profile: {userId: 949476}}
		}
	}

	save() {
		if (!this.model.profile.userId || !this.model.startDate) {
			this.error.userId = !this.model.profile.userId
			this.error.startDate = !this.model.startDate
			return;
		}

		const startDate = moment(this.model.startDate);

		this.configuration.set({
			profile: {
				id: this.model.profile.userId
			},
			startDate: {
				unix: startDate.unix(),
				formatted: startDate.format(DATE_FORMAT)
			}
		});

		this.router.navigateToRoute('stats', {
			userId: this.model.profile.userId,
			startDate: startDate.format(DATE_FORMAT)
		});
	}
}
