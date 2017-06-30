import { Component, ViewChild, Injectable } from '@angular/core';
import { Platform, Nav, LoadingController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Traverser, Marker } from 'angular-traversal';
import { PloneViews, APIService } from '@plone/restapi-angular';
import { EventComponent, FolderComponent, PlonesiteComponent,
         DocumentComponent, ImageComponent, LinkComponent,
         FileComponent, NewsitemComponent, CollectionComponent } from '../views/views';
import { LoginPage } from '../pages/pages';

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
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
    
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
      this.api.status.subscribe((statusObj) => {
        if(statusObj.hasOwnProperty('error')) {
          console.log(statusObj);
          this.handleLoading('error');
        }
        this.handleLoading(statusObj.loading);
      })
    });

  }

  loading;

  handleLoading(value) {
    if(value && !this.loading) {
      this.loading = this.loadingCtrl.create({
        content: "Loading..."
      });
      this.loading.present();
    }
    else if(!value && this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
    else if(value === 'error' && this.loading) {
      this.loading.dismiss();
      this.loading = null;
      this.showErrorMsg();
    }   
  }

  showErrorMsg() {
    let toast = this.toastCtrl.create({
      message: "Something went wrong, try again",
      position: "bottom",
      duration: 3000
    });
    toast.present();
  }
}

