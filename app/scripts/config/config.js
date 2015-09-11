import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import Pickaday from 'pikaday';
import {UserInfo} from '../common/userInfo';

@inject(UserInfo, Router)
export class Config {

    config = {userId: null};
    error  = {userId: false};

	constructor(userInfo, router) {
		this.userInfo = userInfo;
        this.router = router;

        this.userInfo.getUser().then(user => {
        	if (user && user.id) this.config.userId = user.id;
        });
	}

    save() {
        if (this.config.userId) {
            this.error.userId = false;
            this.userInfo.setUser({id: this.config.userId})
                .then(() => this.router.navigate('stats'));
        }
        else {
            this.error.userId = true;
        }
    }

    attached() {
    	var datepicker = new Pikaday({
		    field: this.inputStartDate,
		    minDate: new Date(2000, 0, 1),
		    maxDate: new Date(),
		    yearRange: [2010, 2020]
		});
    	this.btnCalendar.onclick = datepicker.show.bind(datepicker);
    }
}
