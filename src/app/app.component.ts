import { Component, ViewChild, Injectable } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Traverser, Marker } from 'angular-traversal';
import { PloneViews, APIService, AuthenticationService } from '@plone/restapi-angular';
import { EventComponent, FolderComponent, PlonesiteComponent,
         DocumentComponent, ImageComponent, LinkComponent,
         FileComponent, NewsitemComponent, CollectionComponent } from '../views/views';

import { SettingsPage, LoginPage } from '../pages/pages';

@Injectable()
export class TypeMarker extends Marker {
  mark(context: any): string {
    return context['@type'];  
  }
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private views: PloneViews,
              private traverser: Traverser,
              private api: APIService,
              private auth: AuthenticationService,
              private loadingCtrl: LoadingController) {
    
    this.views.initialize();
    this.traverser.addView('view', 'Event', EventComponent);
    this.traverser.addView('view', 'Folder', FolderComponent);
    this.traverser.addView('view', 'Plone Site', PlonesiteComponent);
    this.traverser.addView('view', 'Document', DocumentComponent);
    this.traverser.addView('view', 'Image', ImageComponent);
    this.traverser.addView('view', 'Link', LinkComponent);
    this.traverser.addView('view', 'File', FileComponent);
    this.traverser.addView('view', 'News Item', NewsitemComponent);
    this.traverser.addView('view', 'Collection', CollectionComponent)

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.api.loading.subscribe((value) => {
        this.handleLoading(value); 
      }) 
    });

  }

  loading;
  // isLoading: boolean = false;

  openSettings() {
    this.nav.push(SettingsPage);
  }

  logout() {
    this.auth.logout();
    this.nav.setRoot(LoginPage);
    this.nav.popToRoot(); 
  }

  handleLoading(value) {
    if(value && !this.loading) {
      this.loading = this.loadingCtrl.create({
        content: "Loading..."
      });
      this.loading.present();
      // this.isLoading = true;
    }
    else {
      if(this.loading) {
        this.loading.dismiss();
        this.loading = null;
      }
    }
       
  }
}

