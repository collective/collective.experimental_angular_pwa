import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '@plone/restapi-angular';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  query: string = '';
  searchResults: any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private resService: ResourceService) {
  }

  search(queryText) {
    console.log(queryText);
    let query = {
      "SearchableText" : queryText
    }
    this.resService.find(query, "/").subscribe( (data) => {
      // this.searchResults = data.items.filter(function(item){
      //   return item['@type'] !== 'Collection';
      // });
      this.searchResults = data.items;
      console.log(this.searchResults);
    })
  }

}
