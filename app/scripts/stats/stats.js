import {data} from './mock-data';
import {inject} from 'aurelia-framework';
import {UserInfo} from '../common/userInfo';
import {Reputation} from '../common/reputation';

@inject(UserInfo, Reputation)
export class Stats {

	data = [];

	constructor(userInfo, reputation) {
		this.userInfo = userInfo;
		this.reputation = reputation;
	}

	activate() {
		var user = this.userInfo.getUser();
		this.refreshProfile(user).then(userProfile => {
			this.reputation.load({
				userId: user.id,
				startDate: user.startDate,
				startReputation: 0
			}).then(data => this.data = data);
		});
	}

    /**
     * Load and refresh in storage user profile data.
     * @return {Promise}
     */
    refreshProfile() {
        return this.userInfo.getProfile();
    }
}
