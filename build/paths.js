var app = './app/',
	src = app + 'scripts/',
	dist = app + 'dist/';

module.exports = {
	app: app,
	source: src  + '**/*.js',
	html: src + '**/*.html',
	target: dist,
	server: './server/'
};
