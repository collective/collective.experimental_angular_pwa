import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavigationComponent } from './navigation';

@NgModule({
  declarations: [
    NavigationComponent,
  ],
  imports: [
    IonicPageModule.forChild(NavigationComponent),
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationComponentModule {}
