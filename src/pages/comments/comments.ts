import { Component } from '@angular/core';
import { NavController, ViewController, Events } from 'ionic-angular';

@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  constructor(public navCtrl: NavController, 
              private viewCtrl: ViewController,
              private events: Events) {
    // window.addEventListener('online', () => {
    //   this.viewCtrl.dismiss(true);
    // })
    this.events.subscribe('online', () => {
      console.log('got event');
      this.viewCtrl.dismiss('true');
    })
  }

  dismiss() {
    this.viewCtrl.dismiss('false');
  }

}
