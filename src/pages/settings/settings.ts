import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '@plone/restapi-angular';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  readOffline: boolean = false;
  queryUrls: any = [];
  //number of milliseconds before querying server for refreshing cache
  refreshAfter: number = 60*60*1000;
  lastRefreshAt: number = 0;
  refreshCache;
  storage = new Storage(localStorage);

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private resService: ResourceService,
              private http: Http) {
      this.storage.get("downloadOffline").then( (val) => {
        this.readOffline = val;
        this.toggleDownload();
      })              
  }

  toggleDownload() {
    if(this.readOffline) {
        this.storage.set("downloadOffline", "true");
        //call downloadOffline at fixed intervals to refresh cache
        this.downloadOffline();
        this.refreshCache = setInterval( () => {
            this.downloadOffline();
        }, this.refreshAfter)
    }
    else {
        this.storage.set("downloadOffline", "false");
        clearInterval(this.refreshCache);
    }
  }

  downloadOffline() { 
    let emptyQuery = {
      "SearchableText"  : '',
      "metadata_fields" : 'modified'
    }
    this.resService.find(emptyQuery, "/").subscribe( (data) => {
      console.log(data);
      this.queryUrls = data.items
        .filter( (item) => {
          if(this.lastRefreshAt == 0)
            return item;
          else {
            return new Date(item.modified).getTime() > this.lastRefreshAt;
          }  
        }) 
        .map( (item) => {
          return item['@id']; //return only urls of all items
        })
      for(let url in this.queryUrls) {
        let queryUrl = this.queryUrls[url];
        this.cacheUrl(queryUrl).subscribe((data) => {
          console.log(data);
        })
        let breadcrumbUrl = `${queryUrl}/@components/breadcrumbs`;
        this.cacheUrl(breadcrumbUrl).subscribe((data) => {
          console.log(data);
        }) 
      }
      this.lastRefreshAt = new Date().getTime();
    })
  }   

  cacheUrl(url): Observable<any> {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      return this.http.get(url, options);
  }
}
