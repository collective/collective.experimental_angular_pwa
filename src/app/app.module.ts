import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { RESTAPIModule } from '@plone/restapi-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Marker } from 'angular-traversal';

import { MyApp, TypeMarker } from './app.component';
import { HomePage, PopoverPage, SearchPage, SettingsPage } from '../pages/pages';
import { EventComponent, FolderComponent, DocumentComponent , 
         PlonesiteComponent, ImageComponent, LinkComponent, 
         FileComponent, NewsitemComponent } from '../views/views';
import { NavigationComponent, BreadcrumbsComponent } from '../components/components';  
import { OfflineService } from '../services/offline.service';       

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
    EventComponent,
    BreadcrumbsComponent,
    FolderComponent,
    DocumentComponent,
    PlonesiteComponent,
    ImageComponent,
    LinkComponent,
    FileComponent,
    NewsitemComponent
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
    EventComponent,
    FolderComponent,
    PlonesiteComponent,
    DocumentComponent,
    ImageComponent,
    LinkComponent,
    FileComponent,
    NewsitemComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OfflineService,
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
