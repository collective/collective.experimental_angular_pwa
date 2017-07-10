import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ResourceService, AuthenticationService, APIService } from '@plone/restapi-angular';
import { Observable } from 'rxjs/Rx';
import { ToastController, Events } from 'ionic-angular';

@Injectable()
export class OfflineService {
    queryUrls: any = [];
    lastRefreshAt: number = 0;

    constructor(private resService: ResourceService, 
                private http: Http,
                private toastCtrl: ToastController,
                private auth: AuthenticationService,
                private events: Events) {
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

  showOfflineMsg() {
    let toast = this.toastCtrl.create({
      message: "Device is offline, but you can still use this web site",
      position: "bottom",
      duration: 3000
    });
    toast.present();
  }

  flushQueue() {
    console.log(window.location.href);
    let currLocation = window.location.href;
    //dummy post request
    this.http.post(`${currLocation}/flush`, '').subscribe(() => {
      console.log("queue is flushed");
    })
  }

  handleComments(data, url) {
    let headers = this.auth.getHeaders();
    return this.http.post(`${url}/@comments`, data, {headers: headers}).map((res) => {
      if(res.status === 202) {
        console.log("detected offline");
        this.events.publish('offline:comment', data);
      }
      return res;
    })
  }
}