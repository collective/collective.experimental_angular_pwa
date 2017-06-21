import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ToastController } from 'ionic-angular';
import { PopoverPage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  networkState:boolean = true;

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
            let toast = this.toastCtrl.create({
              message: "Device is offline, but you can still use this web site",
              position: "bottom",
              duration: 3000
            });
            toast.present();
        } 
      }
      this.networkState = navigator.onLine;
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
