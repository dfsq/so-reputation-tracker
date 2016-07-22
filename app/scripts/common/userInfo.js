import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Configuration } from './configuration';

@inject(Configuration, HttpClient)
export class UserInfo {
	constructor(configuration, http) {
		this.configuration = configuration
		this.http = http;
	}

    setProfile(profile) {
    	const config = this.configuration.get()
    	Object.assign(config.profile, profile)
    	return this.configuration.set(config).profile
    }

    getProfile() {
        return this.http.fetch('/api/profile/' + this.configuration.get().profile.id)
	        .then(response => response.json())
	        .then(profile => {
	        	if (!profile.items.length) throw 'Could not load profile';
	        	return this.setProfile(profile.items[0]);
	        })
    }
}
