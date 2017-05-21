import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ToastController } from 'ionic-angular';
import { Traverser } from 'angular-traversal';
import { PloneViews } from '@plone/restapi-angular';
import { CustomEventComponent } from '../../components/custom-event/custom-event';
import { PopoverPage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  networkState:boolean = true;

  constructor(public navCtrl: NavController,
              private views: PloneViews,
              private traverser: Traverser,
              private popoverCtrl: PopoverController,
              private toastCtrl: ToastController) {
      this.views.initialize();
      this.traverser.addView('view', '*', CustomEventComponent);
  }

  ngOnInit() {
      console.log("check connection");
      setInterval(() => {this.checkConnectivity()}, 1000);
  }

  checkConnectivity() {
      if(navigator.onLine !== this.networkState){
        if(navigator.onLine == false) {
            console.log("offline");
            let toast = this.toastCtrl.create({
              message: "Device is offline, please check network connection",
              duration: 3000,
              position: "bottom"
            });
            toast.present();
        } 
      }
      this.networkState = navigator.onLine;
      console.log("network state", this.networkState);
    }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
