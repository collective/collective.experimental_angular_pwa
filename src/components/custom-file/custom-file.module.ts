import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomFileComponent } from './custom-file';

@NgModule({
  declarations: [
    CustomFileComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomFileComponent),
  ],
  exports: [
    CustomFileComponent
  ]
})
export class CustomFileComponentModule {}
