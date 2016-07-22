import { bindable, inject } from 'aurelia-framework';
import { bindingMode } from 'aurelia-binding';
import { useShadowDOM } from 'aurelia-templating';
import 'moment';
import Pickaday from 'pikaday';

@inject(Element)
@bindable('options')
@bindable({
	name: 'value',
	defaultBindingMode: bindingMode.twoWay
})
export class Datepicker {

	constructor(element) {
		this.element = element;
	}

    attached() {

    	// Extend options object
    	Object.assign(this.options, {
		    field: this.inputElement,
		    placeholder: this.element.getAttribute('placeholder') || '',
		    className: this.element.className,
		    onSelect: date => {
			    this.value = date;
		    }
		}, this.options);

    	// Clean up a little
    	this.element.removeAttribute('class');

    	var datepicker = new Pikaday(this.options);
    	datepicker.setDate(this.value);

    	this.btnElement.onclick = datepicker.show.bind(datepicker);
    }
}
