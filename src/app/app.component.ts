import { Component, ViewChild, Injectable } from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Traverser, Marker } from 'angular-traversal';
import { PloneViews } from '@plone/restapi-angular';
import { EventComponent, FolderComponent, PlonesiteComponent,
         DocumentComponent, ImageComponent, LinkComponent,
         FileComponent, NewsitemComponent } from '../views/views';


import { HomePage, SettingsPage } from '../pages/pages';

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
  rootPage:any = HomePage;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private views: PloneViews,
              private traverser: Traverser) {
    
    this.views.initialize();
    this.traverser.addView('view', 'Event', EventComponent);
    this.traverser.addView('view', 'Folder', FolderComponent);
    this.traverser.addView('view', 'Plone Site', PlonesiteComponent);
    this.traverser.addView('view', 'Document', DocumentComponent);
    this.traverser.addView('view', 'Image', ImageComponent);
    this.traverser.addView('view', 'Link', LinkComponent);
    this.traverser.addView('view', 'File', FileComponent);
    this.traverser.addView('view', 'News Item', NewsitemComponent);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

    openSettings() {
      this.nav.push(SettingsPage);
    }
}

