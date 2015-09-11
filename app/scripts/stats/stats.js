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
		this.userInfo.getUser().then(this.refreshProfile.bind(this)).then(user => {
			this.data = data;
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
