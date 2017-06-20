import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import { ResourceService } from '@plone/restapi-angular';
import { FilterPage } from '../filter/filter';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  query: string = '';
  currQuery: string = '';
  searchResults: any[] = [];
  sortBy: string = 'relevance';
  noResult: boolean = false;
  queryChanged: boolean = false;
  queryObj: any = {
    "SearchableText" : this.query
  };
  filterTypes = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private resService: ResourceService,
              private popoverCtrl: PopoverController,
              private events: Events) {
  }

  inputChanged() {
    this.queryChanged = true;
    this.currQuery = this.query;
    this.filterTypes = [];
    this.search(this.query);
  }

  sort() {
    if(this.sortBy === 'date') {
      this.queryObj.sort_on = "Date";
      this.queryObj.sort_order = "reverse";
    }
    else if(this.sortBy === 'alphabetically') {
      this.queryObj.sort_on = "sortable_title";
      this.queryObj.sort_order = "reverse";
    }
    else {
      this.queryObj.sort_on = "";
      this.queryObj.sort_order = "";
    }
    this.search(this.query);
  }

  search(query) {
    this.queryObj.SearchableText = query;
    this.resService.find(this.queryObj, "/").subscribe( (data) => {
      this.searchResults = data.items;
      if(this.searchResults.length == 0) {
        this.noResult = true;
      }
      else {
        this.noResult = false;
      }
      // console.log(this.searchResults);
      if(this.queryChanged) {
        this.queryChanged = false;
        this.getContentTypes();
      }  
    })
  }

  presentFilter(myEvent) {  
    if(this.searchResults.length == 0) {
      //if no results, dont show filter popup
      return;
    }
    let filter = this.popoverCtrl.create(FilterPage, this.filterTypes);
    filter.present({
      ev: myEvent
    });

    //subscribe to event and filter search results
    this.events.subscribe('filter:changed', (filterTypes) => {
      this.filterTypes = filterTypes;
    })

    filter.onDidDismiss(() => {
      let filterBy = [];
      for(let filter in this.filterTypes) {
        if(this.filterTypes[filter].isSet) {
          filterBy.push(this.filterTypes[filter].type)
        }
      }
      this.queryObj.portal_type = filterBy;
      this.search(this.currQuery);
    })
  }

  getContentTypes() {
    //get the various content types present in the search searchResults
    //for further use in filtering
    for(let result in this.searchResults) {
      let isPresent = false;
      //check if already present
      for(let filter in this.filterTypes) {
        if(this.searchResults[result]['@type'] === this.filterTypes[filter].type) {
          isPresent = true;
          break;
        }
      }
      //if unique
      if(!isPresent) {
        let filterObj = {
          "type" : this.searchResults[result]['@type'],
          "isSet" : true
        }
        this.filterTypes.push(filterObj)
      }
    }
    // console.log(this.filterTypes);
  }

  closeSearch() {
    this.navCtrl.pop();
  }
}
