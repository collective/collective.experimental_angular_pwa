import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ResourceService } from '@plone/restapi-angular';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  query: string = '';
  searchResults: any[] = [];
  sortBy: string = 'relevance';
  queryObj: any;
  noResult: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private resService: ResourceService) {
  }

  search(query, empty) {
    //check if user wants to perform an empty query
    if(!empty && query === '') {
      this.noResult = false;
      return;
    }
    this.queryObj = {
      "SearchableText" : query
    }
    if(this.sortBy === 'date') {
      this.queryObj.sort_on = "Date";
      this.queryObj.sort_order = "reverse";
    }
    else if(this.sortBy === 'alphabetically') {
      this.queryObj.sort_on = "sortable_title";
      this.queryObj.sort_order = "reverse";
    }
    this.resService.find(this.queryObj, "/").subscribe( (data) => {
      this.searchResults = data.items;
      if(this.searchResults.length == 0) {
        this.noResult = true;
      }
      else {
        this.noResult = false;
      }
      console.log(this.searchResults);
    })
  }

}
