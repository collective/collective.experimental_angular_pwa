import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  filterTypes = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private events: Events) {
  }

  ionViewDidLoad() {
    console.log("data passed", this.viewCtrl.data);
    this.filterTypes = this.viewCtrl.data;
  } 

  updateFilter(filter, index) {
    filter.isSet = !filter.isSet;
    this.filterTypes[index] = filter;
    //emit event
    this.events.publish('filter:changed', this.filterTypes);
  }

}
