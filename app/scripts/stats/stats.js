import {inject} from 'aurelia-framework';
import {UserInfo} from '../common/userInfo';
import {Reputation} from '../common/reputation';
import {Storage} from '../common/storage';
import moment from 'moment';

@inject(UserInfo, Reputation, Storage)
export class Stats {

	data = [];
	info = {};

	constructor(userInfo, reputation, storage) {
		this.userInfo = userInfo;
		this.reputation = reputation;
		this.storage = storage;
	}

	activate() {

		// Get chart data
		var user = this.userInfo.getUser();
		this.refreshProfile(user).then(userProfile => {

			let cache = this.storage.get('reputation');

			if (cache) {
				return this.data = {
					values: cache,
					initialValue: userProfile.reputation - this.getTotal(cache)
				};
			}

			this.reputation.load({
				userId: user.id,
				startDate: user.startDate
			}).then(data => {
				this.data = {
					values: data,
					initialValue: userProfile.reputation - this.getTotal(data)
				};
				this.storage.set('reputation', data);
			});
		});

		// Information
		this.user = user;
		this.user.startDate = moment(user.startDate).format('DD MMM YYYY');
	}

    /**
     * Load and refresh in storage user profile data.
     * @return {Promise}
     */
    refreshProfile() {
        return this.userInfo.getProfile();
    }

    /**
     * Get total reputation growth since startDate. The value is stored in the second element of the last object in array.
     */
    getTotal(data) {
    	if (!data.length) return 0;
    	return data[data.length - 1][1];
    }
}
