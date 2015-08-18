/**
 * Storage layer. Local storage.
 * TODO: storage adapter class
 */
export class Storage {

	get(key) {
		return Promise.resolve(JSON.parse(window.localStorage.getItem(key) || 'null'));
	}

	set(key, value) {
		window.localStorage.setItem(key, JSON.stringify(value));
	}
}
