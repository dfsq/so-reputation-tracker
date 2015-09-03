import {data} from './mock-data';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {UserInfo} from '../common/userInfo';

@inject(HttpClient, UserInfo)
export class Stats {

	data = null;

	constructor(httpClient, userInfo) {
        this.http = httpClient;
		this.userInfo = userInfo;
	}

	activate() {
		this.userInfo.getUser().then(user => {
            console.log('stats', user);
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
