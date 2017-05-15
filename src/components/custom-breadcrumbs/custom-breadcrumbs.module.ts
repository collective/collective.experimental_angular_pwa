import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomBreadcrumbsComponent } from './custom-breadcrumbs';

@NgModule({
  declarations: [
    CustomBreadcrumbsComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomBreadcrumbsComponent),
  ],
  exports: [
    CustomBreadcrumbsComponent
  ]
})
export class CustomBreadcrumbsComponentModule {}
