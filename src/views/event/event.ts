import { Component } from '@angular/core';
import { ViewView } from '@plone/restapi-angular';

@Component({
  selector: 'event',
  templateUrl: 'event.html'
})

export class EventComponent extends ViewView {

    checkDates(end, start) {
      // console.log(endDate, startDate);
      let endDate = new Date(end).getDate();
      let startDate = new Date(start).getDate();
      if(endDate === startDate) {
        return true;
      }
      else
        return false;
    }
}
