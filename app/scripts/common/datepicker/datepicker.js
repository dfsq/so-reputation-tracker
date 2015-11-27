import {bindable, inject} from 'aurelia-framework';
import Pickaday from 'pikaday';

@inject(Element)
export class Datepicker {

	@bindable options;

	constructor(element) {
		this.element = element;
	}

    attached() {

    	// Extend options object
    	Object.assign(this.options, {
		    field: this.inputElement,
		    placeholder: this.element.getAttribute('placeholder')
		}, this.options);

    	var datepicker = new Pikaday(this.options);
    	this.btnElement.onclick = datepicker.show.bind(datepicker);
    }
}
