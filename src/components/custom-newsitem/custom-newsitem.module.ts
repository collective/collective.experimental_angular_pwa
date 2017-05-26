import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomNewsitemComponent } from './custom-newsitem';

@NgModule({
  declarations: [
    CustomNewsitemComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomNewsitemComponent),
  ],
  exports: [
    CustomNewsitemComponent
  ]
})
export class CustomNewsitemComponentModule {}
