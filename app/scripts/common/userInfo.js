import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Storage} from './storage';

@inject(Storage, HttpClient)
export class UserInfo {

	constructor(storage, http) {
		this.storage = storage;
		this.http = http;
	}

	getUser() {
		return this.storage.get('user').then(user => {
			return this.user = user;
		});
	}

    setUser(data) {
        return this.storage.set('user', data);
    }

    getProfile() {
        return this.http.fetch('/api/profile/' + this.user.user_id)
	        .then(response => response.json())
	        .then(profile => {
	        	if (!profile.items.length) throw 'Could not load profile';
	        	return this.setUser(profile.items[0]);
	        });
    }

	getPeriodRanges() {
		const user = this.getUser();
		return user && user.ranges;
	}
}
