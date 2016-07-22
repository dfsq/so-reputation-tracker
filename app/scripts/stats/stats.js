import { inject } from 'aurelia-framework';
import { Reputation } from './reputation';
import { UserInfo } from '../common/userInfo'
import { Configuration } from '../common/configuration';
import { DATE_FORMAT } from '../common/constants'

@inject(Reputation, Configuration, UserInfo)
export class Stats {

	data = [];

	constructor(reputation, configuration, userInfo) {
		// Specific class for this screen
		document.body.className = 'stats-screen';

		this.reputation = reputation;
		this.configuration = configuration;
		this.userInfo = userInfo
	}

	activate() {
		var config = this.configuration.get();

		if (!config.endDate) {
			var endDate = moment();
			config.endDate = {
				unix: endDate.unix(),
				formatted: endDate.format(DATE_FORMAT)
			};
		}

		Promise.all([
			this.userInfo.getProfile(),
			this.reputation.load(config)
		])
		.then(([profile, data] = values) => {
			this.data = {
				values: data,
				initialValue: profile.reputation - data[0].total
			}
			this.profile = profile
			this.config = config
		});
	}
}
