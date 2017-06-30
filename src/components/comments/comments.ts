import { Component } from '@angular/core';
import { Comments } from '@plone/restapi-angular';

@Component({
  selector: 'comments',
  templateUrl: 'comments.html'
})

export class CommentsComponent extends Comments {

}
