export class Page {

	constructor(options) {
		console.log('page init', options);
		this.viewport = this.decorateViewport(options.viewport);
	}

	decorateViewport(viewport) {
		return {
			setContent: function(content, data) {
				viewport.innerHTML = content;
			}
		};
	}

	render(screen) {
		screen.render(this.viewport);
	}
}
