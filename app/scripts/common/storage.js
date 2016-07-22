/**
 * Storage layer. Local storage.
 */
export class Storage {

	get(key) {
		return JSON.parse(window.localStorage.getItem(key) || 'null');
	}

	set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
        return value;
	}
}
