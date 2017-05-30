import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ToastController } from 'ionic-angular';
import { PopoverPage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  networkState:boolean = true;
  toast;

  constructor(public navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private toastCtrl: ToastController) {

  }

  ngOnInit() {
      console.log("check connection");
      setInterval(() => {this.checkConnectivity()}, 1000);
  }

  checkConnectivity() {
      
      if(navigator.onLine !== this.networkState){
        if(navigator.onLine == false) {
            this.toast = this.toastCtrl.create({
              message: "Device is offline, please check network connection",
              position: "bottom"
            });
            this.toast.present();
        } 
        else {
            this.toast.dismiss();
        }
      }
      this.networkState = navigator.onLine;
      // console.log("network state", this.networkState);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
