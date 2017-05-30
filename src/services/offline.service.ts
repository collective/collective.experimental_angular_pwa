import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ResourceService } from '@plone/restapi-angular';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OfflineService {
    queryUrls: any = [];
    lastRefreshAt: number = 0;

    constructor(private resService: ResourceService, private http: Http ) {

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