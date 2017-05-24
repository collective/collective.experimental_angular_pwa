import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomPlonesiteComponent } from './custom-plonesite';

@NgModule({
  declarations: [
    CustomPlonesiteComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomPlonesiteComponent),
  ],
  exports: [
    CustomPlonesiteComponent
  ]
})
export class CustomPlonesiteComponentModule {}
