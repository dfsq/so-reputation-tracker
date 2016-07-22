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
		return resolve(periods && periods[params.userId] || [], params);
	}

	/**
	 * Cache reputation data for the period.
	 */
	savePeriod(period) {

		var periods = this.storage.get('periods') || {}
		var userId = period.userId

		if (!periods[userId]) periods[userId] = []

		periods[userId].push(period)
		this.storage.set('periods', periods)

		return period
	}

	/**
	 * Ensure adjucent periods are merged together.
	 */
	mergePeriods(periods) {
		console.log('===== merge', periods);
		return periods
	}
}

/**
 * Periods resolving algorithm.
 * @param periods {Array<Object>}
 * @param params {Object}
 */
function resolve(periods, params) {

	// Empty periods
	if (!periods.length) {
		return [params];
	}

	// Array of ranges
	var ranges = [],
	    period = periods[0];

	if (params.startDate < period.startDate.unix) {
		if (params.endDate.unix > period.startDate.unix) {
			ranges.push({start: params.startData, end: period.startData});

			if (params.endDate.unix > period.endDate.unix) {
				ranges.push({start: period.startDate.unix, end: period.endDate, data: getDays(period, period.startDate, period.endDate)});
				return ranges.concat(resolve(periods.slice(1), {
					start: period.endDate,
					end: params.endDate
				}));
			}
			else {
				ranges.push({start: period.startDate, end: params.endDate, data: getDays(period, period.startDate, params.endDate)})
			}
		}
		else {
			ranges.push({start: params.startDate, end: params.endDate});
		}

		return ranges;
	}
	else {
		if (params.startDate.unix < period.endDate.unix) {
			ranges.push({start: params.startDate, end: period.endDate, data: getDays(params.startDate, period.endDate)});
		}
		return ranges.concat(resolve(periods.slice(1), {
			start: params.startDate < period.endDate ? period.endDate : params.startDate,
			end: params.endDate
		}));
	}
}

/**
 * Slice only part of period days between start and end.
 */
function getDays(period, start, end) {
	return
}
