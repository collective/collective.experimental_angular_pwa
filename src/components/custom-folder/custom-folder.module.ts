import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomFolderComponent } from './custom-folder';

@NgModule({
  declarations: [
    CustomFolderComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomFolderComponent),
  ],
  exports: [
    CustomFolderComponent
  ]
})
export class CustomFolderComponentModule {}
