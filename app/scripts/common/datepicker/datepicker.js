import {bindable} from 'aurelia-framework';
import Pickaday from 'pikaday';

export class Datepicker {

	@bindable options;

    attached() {

    	var options = Object.assign({
		    field: this.inputElement
		}, this.options);

    	var datepicker = new Pikaday(options);
    	this.btnElement.onclick = datepicker.show.bind(datepicker);
    }
}
