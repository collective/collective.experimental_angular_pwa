import { DefaultWidgetRegistry } from 'angular2-schema-form';
import { IonicStringWidget, IonicTextAreaWidget, IonicCheckboxWidget } from './widgets';

export class IonicRegistry extends DefaultWidgetRegistry {
    constructor() {
        super();
        this.register('string', IonicStringWidget);
        this.register('textarea', IonicTextAreaWidget);
        this.register('boolean', IonicCheckboxWidget);
        this.register('checkbox', IonicCheckboxWidget);
        this.setDefaultWidget(IonicStringWidget);
    }
}