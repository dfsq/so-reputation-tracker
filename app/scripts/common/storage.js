/**
 * Storage layer. Local storage.
 * TODO: storage adapter class
 */
export class Storage {

	get(key) {
		var value = JSON.parse(window.localStorage.getItem(key) || 'null');
		return Promise.resolve(value);
	}

	set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
        return Promise.resolve(value);
	}
}
