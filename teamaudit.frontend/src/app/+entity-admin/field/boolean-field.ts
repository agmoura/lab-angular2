import {Component, Input, forwardRef} from '@angular/core';
import {FieldComponent} from "./field";

@Component({
    selector: 'boolean-field',
    template: '<span>{{record[source] ? "X" : "O"}}</span>',
    providers: [{provide: FieldComponent, useExisting: BooleanFieldComponent}]
})
export class BooleanFieldComponent extends FieldComponent {
    @Input() public source: string;
    @Input() public label: string;

    constructor() {
        super();
    }
}