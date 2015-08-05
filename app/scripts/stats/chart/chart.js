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

        const initialReputation = 0;

        console.log(this.data);

        nv.addGraph(() => {
            var chart = nv.models.lineChart().options({

                tooltips: true,
                tooltipContent: function (key, x, y, e, graph) {

                    var delta = e.point[3] - planned,
                        sign = delta > 0 ? '+' : '';

                    return self.tooltipTemplate(key, {
                        date: e.point[2],
                        total: e.point[1] + initialReputation,
                        planned: sign + delta,
                        earned: e.point[3]
                    });
                },

                isArea: true,
                clipEdge: false,

                x: function(d) {
                    return d[0];
                },
                y: function(d) {
                    return d[1] + initialReputation;
                }
            });

            chart.xAxis
                .axisLabel('Date')
                .showMaxMin(true)
                .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });

            chart.yAxis
                .axisLabel('Reputation')
                .tickFormat(d3.format(','));

            d3.select(this.chartContainer)
                .datum([
                    //{key: 'Planned', color: '#AEC7E8', values: [
                    //    [Date.parse(options.startDate), 0, options.startDate],
                    //    [Date.parse(options.endDate), options.goalReputation - initialReputation, options.endDate]
                    //]},
                    {key: 'Reputation', color: '#1F77B4', values: this.data},
                ])
                .transition().duration(500).call(chart);

            nv.utils.windowResize(chart.update);
        });
	}
}
