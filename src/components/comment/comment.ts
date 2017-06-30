import { Component } from '@angular/core';
import { Comment } from '@plone/restapi-angular';

@Component({
  selector: 'comment',
  templateUrl: 'comment.html'
})
export class CommentComponent extends Comment {
}
