import { Component } from '@angular/core';
import { CommentAdd } from '@plone/restapi-angular';

@Component({
  selector: 'comment-add',
  templateUrl: 'comment-add.html'
})
export class CommentAddComponent extends CommentAdd {
}
