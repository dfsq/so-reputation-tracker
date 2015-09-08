import {data} from './mock-data';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {UserInfo} from '../common/userInfo';

@inject(HttpClient, UserInfo)
export class Stats {

	data = null;

	constructor(http, userInfo) {
        this.http = http;
		this.userInfo = userInfo;
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
