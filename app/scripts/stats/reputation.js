import {inject } from 'aurelia-framework';
import {HttpClient } from 'aurelia-fetch-client';
import {PeriodsResolver } from './periodsResolver';

import {data} from './mock-data'

@inject(HttpClient, PeriodsResolver)
export class Reputation {

	constructor(http, periodsResolver) {
		this.http = http;
		this.periodsResolver = periodsResolver;
	}

	/**
	 * Perform request siimlar to /api/reputation?userId=949476&startDate=01-Mar-2016
	 * @param params {Object}
	 * @param params.userId {Number}
	 * @param params.startDate {String}
	 * @param [params.startReputation] {Number}
	 * @return {Promise}
	 */
	request(params) {
		return this.http.fetch('/api/reputation').then(response => {
			return response.json();
		});
	}

	/**
	 * @param params {Object}
	 * @param params.userId {Number}
	 * @param params.startDate {String}
	 * @param [params.startReputation] {Number}
	 * @return {Promise}
	 */
	load(params) {
		//return Promise.resolve(data);
		var periods = this.periodsResolver.get(params);
		return Promise.all(periods.map(period => {
			return period.days || this.request(period);
		}))
		// Merge all periods
		.then((allDays) => {
			return [].concat.apply([], allDays);
		})
	}
}









