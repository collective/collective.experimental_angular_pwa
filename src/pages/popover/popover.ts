import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SearchPage } from '../pages';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private viewCtrl: ViewController) {
  }

  search() {
    this.navCtrl.push(SearchPage);
    this.viewCtrl.dismiss();
  }
}
