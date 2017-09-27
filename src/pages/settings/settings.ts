import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OfflineService } from '../../services/offline.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  readOffline: boolean = false;
  //number of milliseconds before querying server for refreshing cache
  refreshAfter: number = 60*60*1000;
  refreshCache;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private offlineService: OfflineService,
  ) {
    this.storage.get("downloadOffline").then((val) => {
      this.readOffline = val;
      this.toggleDownload();
    });
  }

  toggleDownload() {
    if(this.readOffline) {
        this.storage.set("downloadOffline", "true");
        //call downloadOffline at fixed intervals to refresh cache
        this.offlineService.downloadOffline();
        this.refreshCache = setInterval( () => {
            this.offlineService.downloadOffline();
        }, this.refreshAfter)
    }
    else {
        this.storage.set("downloadOffline", "false");
        clearInterval(this.refreshCache);
    }
  }

}
