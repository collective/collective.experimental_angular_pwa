import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomLinkComponent } from './custom-link';

@NgModule({
  declarations: [
    CustomLinkComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomLinkComponent),
  ],
  exports: [
    CustomLinkComponent
  ]
})
export class CustomLinkComponentModule {}
