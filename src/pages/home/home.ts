import { Component } from '@angular/core';
import { NavController, PopoverController, ActionSheetController, 
         Platform, ModalController } from 'ionic-angular';
import { PopoverPage, CommentsPage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  networkState:boolean = true;

  constructor(public navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private platform: Platform) {
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
    modal.onDidDismiss((reload) => {
      console.log(reload);
      if(reload === 'true') {
        console.log("opened again");
        this.openCommentsModal();
      }
      else {
        console.log('dont reload');
      }
    })
  }

}
