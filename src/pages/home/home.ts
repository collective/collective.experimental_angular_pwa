import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Traverser } from 'angular-traversal';
import { PloneViews } from '@plone/restapi-angular';
import { CustomEventComponent } from '../../components/custom-event/custom-event';
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private views: PloneViews,
              private traverser: Traverser,
              private popoverCtrl: PopoverController) {
      this.views.initialize();
      this.traverser.addView('view', '*', CustomEventComponent);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
