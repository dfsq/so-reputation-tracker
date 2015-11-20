/**
 * Storage layer. Local storage.
 */
export class Storage {

	get(key) {
		var value = JSON.parse(window.localStorage.getItem(key) || 'null');
		return value;
	}

	set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
        return value;
	}
}
