// ES7 syntax
//import {bindable} from 'aurelia-framework';
//export class Chart {
//	@bindable data = null;
//}
// ES6 syntax
//import {Decorators} from 'aurelia-framework';
//static decorators() {
//	return Decorators.bindable({name: 'data', defaultValue: null});
//}


import {bindable} from 'aurelia-framework';
import d3 from 'd3';
import nvd3 from 'nvd3';
import 'nvd3/build/nv.d3.min.css!';

export class Chart {

	@bindable data = null;

	attached() {

		nv.addGraph(() => {
			var chart = nv.models.lineChart().useInteractiveGuideline(true);

			chart.xAxis
				.axisLabel('Time (ms)')
				.tickFormat(d3.format(',r'));

			chart.yAxis
				.axisLabel('Voltage (v)')
				.tickFormat(d3.format('.02f'));

			d3.select(this.chartContainer)
				.datum(this.data)
				.transition().duration(500)
				.call(chart);

			return chart;
		});
	}
}
