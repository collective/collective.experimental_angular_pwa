import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { RESTAPIModule } from '@plone/restapi-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Marker } from 'angular-traversal';
import { HttpModule } from '@angular/http';

import { MyApp, TypeMarker } from './app.component';
import { HomePage, PopoverPage, FilterPage, SearchPage, 
         SettingsPage, LoginPage, CommentsPage } from '../pages/pages';
import { EventComponent, FolderComponent, DocumentComponent , 
         PlonesiteComponent, ImageComponent, LinkComponent, 
         FileComponent, NewsitemComponent, CollectionComponent } from '../views/views';
import { NavigationComponent, BreadcrumbsComponent, CommentsComponent,
         CommentComponent, CommentAddComponent } from '../components/components';  
import { OfflineService } from '../services/offline.service';
import { IonicRegistry } from '../widgets/registry';
import { IonicStringWidget, IonicTextAreaWidget, IonicCheckboxWidget, IonicDatetimeWidget } from '../widgets/widgets';
import { WidgetRegistry } from 'angular2-schema-form';
import { ReactiveFormsModule } from '@angular/forms';

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
    FilterPage,
    SearchPage,
    SettingsPage,
    LoginPage,
    CommentsPage,
    NavigationComponent,
    EventComponent,
    BreadcrumbsComponent,
    FolderComponent,
    DocumentComponent,
    PlonesiteComponent,
    ImageComponent,
    LinkComponent,
    FileComponent,
    NewsitemComponent,
    CollectionComponent,
    CommentsComponent,
    CommentComponent,
    CommentAddComponent,
    IonicStringWidget,
    IonicTextAreaWidget,
    IonicCheckboxWidget,
    IonicDatetimeWidget
  ],
  imports: [
    BrowserModule,
    RESTAPIModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PopoverPage,
    FilterPage,
    SearchPage,
    SettingsPage,
    LoginPage,
    CommentsPage,
    EventComponent,
    FolderComponent,
    PlonesiteComponent,
    DocumentComponent,
    ImageComponent,
    LinkComponent,
    FileComponent,
    NewsitemComponent,
    CollectionComponent,
    IonicStringWidget,
    IonicTextAreaWidget,
    IonicCheckboxWidget,
    IonicDatetimeWidget
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OfflineService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: 'CONFIGURATION', useValue: {
        BACKEND_URL: 'http://plonepwa.herokuapp.com/Plone',
      } 
    },
    { provide: Marker, useClass: TypeMarker },
    { provide: WidgetRegistry, useClass: IonicRegistry }
  ]
})
export class AppModule {}
