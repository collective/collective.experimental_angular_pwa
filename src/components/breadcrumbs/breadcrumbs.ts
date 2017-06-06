import { Component } from '@angular/core';
import { TraversingComponent, ResourceService } from '@plone/restapi-angular';
import { Traverser } from 'angular-traversal';

@Component({
  selector: 'breadcrumbs',
  templateUrl: 'breadcrumbs.html'
})
export class BreadcrumbsComponent extends TraversingComponent {

     links: any[] = [];
     constructor(
      private service: ResourceService,
      private traverser: Traverser,
    ) {
      super(traverser);
    }

    onTraverse(target) {
      if (target.contextPath) {
        this.service.breadcrumbs(target.contextPath).subscribe(res => {
          this.links = res[0].items;
          setTimeout(() => {
            this.scrollBreadcrumbs();
          }, 50);
        });
      }
    }

    scrollBreadcrumbs() {
      let slider = document.querySelector(".slider");
      slider.scrollLeft = slider.scrollWidth;
      console.log("scrolled");
    }
}
