import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '@plone/restapi-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchResults: any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private resService: ResourceService) {
  }

  search(queryText) {
    let query = {
      "SearchableText" : queryText
    }
    this.resService.find(query, "/").subscribe( (data) => {
      this.searchResults = data.items.filter(function(item){
        return item['@type'] !== 'Collection';
      });
    })
  }

}
