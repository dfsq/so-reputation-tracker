// test asdf
export function configure(aurelia) {

	const resourcePaths = ['common/datepicker/datepicker'];

	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		.globalResources(...resourcePaths);

	aurelia.start().then(a => a.setRoot());
}
