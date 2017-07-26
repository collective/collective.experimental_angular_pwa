import { Component } from '@angular/core';
import { StringWidget } from 'angular2-schema-form';

@Component({
  selector: 'app-medium-widget',
  templateUrl: './medium.widget.html'
})
export class MediumWidget extends StringWidget { }