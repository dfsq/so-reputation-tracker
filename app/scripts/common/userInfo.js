import {inject} from 'aurelia-framework';
import {Storage} from './storage';

@inject(Storage)
export class UserInfo {

	constructor(storage) {
		this.storage = storage;
	}

	getUser() {
		return this.storage.get('user');
	}

	getPeriodRanges() {
		const user = this.getUser();
		return user && user.ranges;
	}
}
