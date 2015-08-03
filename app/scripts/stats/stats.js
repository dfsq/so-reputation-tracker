function data() {
	var sin = [],
		cos = [];

	for (var i = 0; i < 100; i++) {
		sin.push({x: i, y: Math.sin(i/10)});
		cos.push({x: i, y: .5 * Math.cos(i/10)});
	}

	return [
		{
			values: sin,
			key: 'Sine Wave',
			color: '#ff7f0e'
		},
		{
			values: cos,
			key: 'Cosine Wave',
			color: '#2ca02c'
		}
	];
}

export class Stats {

	data = null;

	constructor() {
		console.log('stats');
	}

	activate() {
		this.data = data();
	}
}
