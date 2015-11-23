import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserInfo} from '../common/userInfo';

@inject(UserInfo, Router)
export class Config {

    config = {userId: 949476}; // userId: null
    error  = {userId: false};
    datepickerConfig = {
    	minDate: new Date(2010, 0, 1),
	    maxDate: new Date(),
	    yearRange: [2011, new Date().getFullYear()]
    };

	constructor(userInfo, router) {

		// Specific class for this screen (better place for this?)
		document.body.className = 'config-screen';

		this.userInfo = userInfo;
        this.router = router;

        var user = this.userInfo.getUser();
       	if (user && user.id) this.config.userId = user.id;
	}

    save() {
        if (this.config.userId && this.config.startDate) {
            this.error.userId = false;
            this.userInfo.setStartDate(this.config.startDate);
            this.userInfo.setUser({id: this.config.userId});
            this.router.navigate('stats');
        }
        else {
            this.error.userId = true;
        }
    }
}
