import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ResourceService, AuthenticationService } from '@plone/restapi-angular';
import { Observable } from 'rxjs/Rx';
import { ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class OfflineService {

  constructor(
    private resService: ResourceService, 
    private http: Http,
    private toastCtrl: ToastController,
    private auth: AuthenticationService,
    private events: Events,
    private storage: Storage,
  ) { }

  downloadOffline() {
    this.storage.get('last-refresh').then(lastRefreshAt => {
      const options = {
        metadata_fields: ['modified', ],
        size: 1000,
      }
      this.resService.find({}, '/', options).subscribe( (data) => {
        console.log(data);
        const now = new Date().getTime();
        data.items
          .filter((item) => {
            return !lastRefreshAt || new Date(item.modified).getTime() > lastRefreshAt;
          })
          .map((item) => {
            return item['@id']; //return only urls of all items
          })
          .map(url => {
            this.cacheUrl(url).subscribe((data) => {
              console.log(data);
            });
            let breadcrumbUrl = `${url}/@components/breadcrumbs`;
            this.cacheUrl(breadcrumbUrl).subscribe((data) => {
              console.log(data);
            });
          });
        this.storage.set('last-refresh', now);
      })
    });
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