import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '@plone/restapi-angular';
import { Observable } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  readOffline: boolean = false;
  queryUrls: any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private resService: ResourceService,
              private http: Http) {
  }

  toggleDownload() {
    if(this.readOffline) {
        this.downloadOffline();
    }
  }

  downloadOffline() {
    let emptyQuery = {
      "SearchableText" : ''
    }
    this.resService.find(emptyQuery, "/").subscribe( (data) => {
      console.log(data);
      this.queryUrls = data.items.map( (item) => {
        return item['@id'];
      });
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
