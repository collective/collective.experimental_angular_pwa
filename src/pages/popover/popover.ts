import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';
import { SearchPage, SettingsPage, LoginPage } from '../pages';
import { AuthenticationService } from '@plone/restapi-angular';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private viewCtrl: ViewController,
              private auth: AuthenticationService,
              private app: App) {
  }

  search() {
    this.navCtrl.push(SearchPage);
    this.viewCtrl.dismiss();
  }

  openSettings() {
    this.navCtrl.push(SettingsPage);
    this.viewCtrl.dismiss();
  }

  logout() {
    this.viewCtrl.dismiss();
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
    this.app.getRootNav().popToRoot();
  }
}
