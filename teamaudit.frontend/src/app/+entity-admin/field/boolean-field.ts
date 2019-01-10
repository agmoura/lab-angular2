import {Component, Input} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'boolean-field',
    template: '<span>{{record[source] ? "X" : "O"}}</span>',
    providers: [{provide: FieldComponent, useExisting: BooleanFieldComponent}]
})
export class BooleanFieldComponent extends FieldComponent<boolean> {
    @Input() public source: string;
    @Input() public label: string;

    constructor() {
        super();
    }
}