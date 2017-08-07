import { Component } from '@angular/core';
import { NavController, PopoverController, ActionSheetController, 
         Platform, ModalController } from 'ionic-angular';
import { PopoverPage, CommentsPage } from '../pages';
import { Traverser } from 'angular-traversal';

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
              private platform: Platform,
              private traverser: Traverser) {
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
            this.openEditView();
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

  openEditView() {
    let currUrl = document.location.href;
    let currUrlArray = currUrl.split("/");
    let redirectUrl = (currUrlArray.slice(4)).join("/");
    console.log(redirectUrl);
    this.traverser.traverse(`/${redirectUrl}/@@edit`);
  }

  canEdit() {
    let currUrl = document.location.href;
    let currUrlArray = currUrl.split("/");
    if(currUrlArray[currUrlArray.length - 1] == "" || currUrlArray[currUrlArray.length - 1] == "@@edit") {
      return false;
    }
    else {
      return true;
    }
  }

}
