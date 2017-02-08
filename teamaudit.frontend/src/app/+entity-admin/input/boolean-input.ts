import {Component, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ValueAccessorBase} from "./value-accessor";

@Component({
    selector: 'boolean-input',
    template: `
    <md-slide-toggle [(ngModel)]="value" [name]="name">{{label | translate}}</md-slide-toggle>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: BooleanInputComponent,
        multi: true,
    }],
})
export class BooleanInputComponent extends ValueAccessorBase<string> {
    @Input() public name: string;
    @Input() public label: string;

    public identifier = `boolean-input-${identifier++}`;

    constructor() {
        super();
    }
}

let identifier = 0;