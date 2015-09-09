import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {UserInfo} from '../common/userInfo';

@inject(UserInfo, Router)
export class Config {

    config = {userId: null};
    error  = {userId: false};

	constructor(userInfo, router) {
		this.userInfo = userInfo;
        this.router = router;
	}

    save() {
    	debugger
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
    	console.log(this.btnCalendar);
    }
}
