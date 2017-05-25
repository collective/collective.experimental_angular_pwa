import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomImageComponent } from './custom-image';

@NgModule({
  declarations: [
    CustomImageComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomImageComponent),
  ],
  exports: [
    CustomImageComponent
  ]
})
export class CustomImageComponentModule {}
