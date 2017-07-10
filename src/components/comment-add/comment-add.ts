import { Component } from '@angular/core';
import { CommentAdd, CommentsService, APIService } from '@plone/restapi-angular';
import { OfflineService } from '../../services/offline.service';

@Component({
  selector: 'comment-add',
  templateUrl: 'comment-add.html'
})

export class CommentAddComponent extends CommentAdd {

    constructor(service: CommentsService, 
                private offlineService: OfflineService,
                private api: APIService) {
      super(service);
    }

    add(form) {  
        let url = this.api.getFullPath(this.path);   
        this.offlineService.handleComments(form.value, url).subscribe(() => {
          this.onCreate.next(true);
          form.resetForm();
        }), function (err) {
          this.error = err.json().message;
        }
    }
}
