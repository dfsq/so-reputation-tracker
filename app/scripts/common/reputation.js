import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Reputation {

	constructor(http) {
		this.http = http;
	}

	url(params) {
		return `/api/reputation/${params.userId}/${params.startDate}/${params.startReputation}`;
	}

	load(params) {
		return this.http.get(this.url(params)).then(response => response.json());
	}
}
