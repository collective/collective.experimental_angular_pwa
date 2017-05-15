import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Traverser } from 'angular-traversal';
import { PloneViews } from '@plone/restapi-angular';
import { CustomEventComponent } from '../../components/custom-event/custom-event';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private views: PloneViews,
              private traverser: Traverser) {
      this.views.initialize();
      this.traverser.addView('view', '*', CustomEventComponent);
  }

}
