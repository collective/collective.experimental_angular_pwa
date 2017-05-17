import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { RESTAPIModule } from '@plone/restapi-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/popover/popover';
import { SearchPage } from '../pages/search/search';
import { NavigationComponent } from '../components/navigation/navigation';
import { CustomEventComponent } from '../components/custom-event/custom-event';
import { CustomBreadcrumbsComponent } from '../components/custom-breadcrumbs/custom-breadcrumbs';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'e9c8d274'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopoverPage,
    SearchPage,
    NavigationComponent,
    CustomEventComponent,
    CustomBreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
    RESTAPIModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomEventComponent,
    PopoverPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: 'CONFIGURATION', useValue: {
        BACKEND_URL: 'http://localhost:8080/Plone',
      }
    }
  ]
})
export class AppModule {}
