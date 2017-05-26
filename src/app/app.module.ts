import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { RESTAPIModule } from '@plone/restapi-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Marker } from 'angular-traversal';

import { MyApp } from './app.component';
import { HomePage, PopoverPage, SearchPage, SettingsPage, TypeMarker } from '../pages/pages';
import { NavigationComponent, CustomBreadcrumbsComponent, CustomEventComponent, 
         CustomFolderComponent, CustomDocumentComponent , CustomPlonesiteComponent,
         CustomImageComponent, CustomLinkComponent, CustomFileComponent, 
         CustomNewsitemComponent } from '../components/components';

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
    SettingsPage,
    NavigationComponent,
    CustomEventComponent,
    CustomBreadcrumbsComponent,
    CustomFolderComponent,
    CustomDocumentComponent,
    CustomPlonesiteComponent,
    CustomImageComponent,
    CustomLinkComponent,
    CustomFileComponent,
    CustomNewsitemComponent
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
    PopoverPage,
    SearchPage,
    SettingsPage,
    CustomEventComponent,
    CustomFolderComponent,
    CustomPlonesiteComponent,
    CustomDocumentComponent,
    CustomImageComponent,
    CustomLinkComponent,
    CustomFileComponent,
    CustomNewsitemComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: 'CONFIGURATION', useValue: {
        BACKEND_URL: 'http://localhost:8080/Plone',
      } 
    },
    { provide: Marker, useClass: TypeMarker }
  ]
})
export class AppModule {}
