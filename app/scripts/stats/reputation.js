import {inject } from 'aurelia-framework';
import {HttpClient } from 'aurelia-fetch-client';
import {PeriodsResolver } from './periodsResolver';

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

		var queryString = new URLSearchParams()
		queryString.append('userId', params.profile.id)
		queryString.append('startDate', params.startDate.formatted)

		if (queryString.endDate) {
			queryString.append('endDate', params.endDate.formatted)
		}

		return this.http.fetch('/api/reputation?' + queryString)
			.then(res => res.json())
	}

	/**
	 * @param params {Object}
	 * @pa
	 * @param params.profile.userId {Number}
	 * @param params.startDate {String}
	 * @param [params.startReputation] {Number}
	 * @return {Promise}
	 */
	load(params) {
		var periods = this.periodsResolver.get(params);
		return Promise.all(periods.map(period => {
			if (period.days) {
				return period.days
			}

			return this.request(period)
				//.then(data => this.periodsResolver.savePeriod(data))
		}))
		// .then(periods => this.periodsResolver.mergePeriods(periods))
		.then(allDays => {
			// console.log('===== all days', allDays)
			return [].concat.apply([], allDays);
		})
	}
}









