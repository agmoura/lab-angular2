import {Component, Input} from '@angular/core';

@Component({
    selector: 'boolean-field',
    template: '<span>{{source}}</span>'
})
export class BooleanFieldComponent {
    @Input() public source: string;
    @Input() public label: string;

    constructor() {
    }
}