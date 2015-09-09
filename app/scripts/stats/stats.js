import {data} from './mock-data';
import {inject} from 'aurelia-framework';
import {UserInfo} from '../common/userInfo';
import {Reputation} from '../common/reputation';

@inject(UserInfo, Reputation)
export class Stats {

	data = null;

	constructor(http, userInfo) {
        this.http = http;
		this.userInfo = userInfo;
	}

	activate() {
		this.userInfo.getProfile().then(user => {
			var params = {userId: user.user_id}
			// this.reputation.load({
			// 	userId: user
			// }).then(data => this.data);
		});
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
