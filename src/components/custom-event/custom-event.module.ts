import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomEventComponent } from './custom-event';

@NgModule({
  declarations: [
    CustomEventComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomEventComponent),
  ],
  exports: [
    CustomEventComponent
  ]
})
export class CustomEventComponentModule {}
