import {Component, Input} from '@angular/core';

@Component({
    selector: 'text-field',
    template: '<span>{{source}}</span>'
})
export class TextFieldComponent {
    @Input() public source: string;
    @Input() public label: string;

    constructor() {
    }
}