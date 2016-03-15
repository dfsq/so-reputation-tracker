import {inject} from 'aurelia-framework';
import {Storage } from '../common/storage';

@inject(Storage)
export class PeriodsResolver {

	constructor(storage) {
		this.storage = storage;
		window.storage = storage;
	}

	/**
	 * @param params {Object}
	 * @param params.userId {String}
	 * @param params.startDate {String}
	 * @param [params.endDate] {String}
     */
	get(params) {
		var periods = this.storage.get('periods');
		return resolve(periods && periods[params.userId] || []);
	}

	/**
	 * Cache reputation data for the period.
	 */
	savePeriod(userId, startDate, endDate) {

	}

	mergePeriods() {}
}

function resolve(periods) {
	return periods;
}
