import {Page} from './common/page';
import {Storage} from './common/storage';
import {Login} from './login/login'
import {Chart} from './chart/chart';

var storage = new Storage();
var user = storage.getUser();

var screen;

if (user) {
	screen = new Chart();
}
else {
	screen = new Login();
}

var page = new Page({
	viewport: document.querySelector('[app-view]')
});
page.render(screen);

