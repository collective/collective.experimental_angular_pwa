import { Component } from '@angular/core';
import { Comments, CommentsService, AuthenticationService } from '@plone/restapi-angular';
import { Traverser } from 'angular-traversal';
import { Events } from 'ionic-angular';

@Component({
  selector: 'comments',
  templateUrl: 'comments.html'
})

export class CommentsComponent extends Comments {
  constructor(service: CommentsService, traverser: Traverser, 
              private auth: AuthenticationService,
              private events: Events) {
    super(service, traverser);
    this.events.subscribe('offline:comment', (data) => {
      console.log(data);
      this.commentOffline(data);
    })
  }

  offlineComments = [];
  offlineCommentObj;

  commentOffline(data) {
    console.log(this.auth.getUserInfo().sub);
    this.offlineCommentObj = {
      "author_name" : this.auth.getUserInfo().sub,
      "text" : { "data" : data.text },
      "creation_date" : (new Date()).toISOString()
    };
    this.offlineComments.push(this.offlineCommentObj);
    console.log(this.offlineComments);
  }
}
