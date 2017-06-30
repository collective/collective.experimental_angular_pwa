import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ToastController, 
         ActionSheetController, Platform, ModalController } from 'ionic-angular';
import { PopoverPage, CommentsPage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  networkState:boolean = true;

  constructor(public navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private platform: Platform) {

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

  showActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      cssClass: 'action-sheets-page',
      buttons: [
        {
          text: 'Comments',
          icon: !this.platform.is('ios') ? 'chatbubbles' : null,
          cssClass: 'message-icon',
          handler: () => {
            console.log('handle messages');
            this.openCommentsModal();
          }
        },
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          cssClass: 'edit-icon',
          handler: () => {
            console.log('handle edit');
          }
        },
        {
         text: 'Cancel',
         role: 'cancel',
         icon: !this.platform.is('ios') ? 'close' : null,
         handler: () => {
           console.log('Cancel clicked');
         }
       }
      ]
    });
    actionSheet.present();
  }

  openCommentsModal() {
    let modal = this.modalCtrl.create(CommentsPage);
    modal.present();
  }

}
