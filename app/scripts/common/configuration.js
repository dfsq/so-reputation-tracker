import { inject } from 'aurelia-framework';
import { Storage } from './storage';

@inject(Storage)
export class Configuration {

	constructor(Storage) {
		this.storage = Storage;
	}

	/**
	 * Set configuration object.
	 * @param config {Object}
	 */
	set(config) {
		this.storage.set('config', config);
	}

	/**
	 * Get configuration object.
	 */
	get() {
		return this.storage.get('config');
	}
}
