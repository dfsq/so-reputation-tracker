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
		this.user = this.storage.get('user');
		if (this.user) {
			this.user.startDate = this.storage.get('startDate');
		}
		return this.user;
	}

    setUser(data) {
    	data.id = data.user_id || data.id;
        return this.storage.set('user', data);
    }

    setStartDate(date) {
    	return this.storage.set('startDate', date);
    }

    getProfile() {
        return this.http.fetch('/api/profile/' + this.user.id)
	        .then(response => response.json())
	        .then(profile => {
	        	if (!profile.items.length) throw 'Could not load profile';
	        	return this.setUser(profile.items[0]);
	        });
    }
}
