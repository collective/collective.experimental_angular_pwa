import { Component, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { CommentAdd, CommentsService, AuthenticationService, APIService } from '@plone/restapi-angular';

@Component({
  selector: 'comment-add',
  templateUrl: 'comment-add.html'
})

export class CommentAddComponent extends CommentAdd {
    @Output() offlineData: EventEmitter<Object> = new EventEmitter();

    constructor(private auth: AuthenticationService, 
                private http: Http, service: CommentsService,
                private api: APIService) {
      super(service);
    }

    add(form) {  
        let url = this.api.getFullPath(this.path);   
        this.sendPost(form.value, url).subscribe((res) => {
          if(res.status === 202) {
            //do offline
            console.log("detected offline");
            this.offlineData.emit(form.value);
          }
          this.onCreate.next(true);
          form.resetForm();
        }), function (err) {
          this.error = err.json().message;
        }
        
    }

    sendPost(data, url) {
      let headers = this.auth.getHeaders();
      // this.api.status.next({ loading: true });
      return this.http.post(`${url}/@comments`, data, {headers: headers}).map(function(res) {
        // this.api.status.next({ loading: false })
        return res;
      })
    }
}
