import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomDocumentComponent } from './custom-document';

@NgModule({
  declarations: [
    CustomDocumentComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomDocumentComponent),
  ],
  exports: [
    CustomDocumentComponent
  ]
})
export class CustomDocumentComponentModule {}
