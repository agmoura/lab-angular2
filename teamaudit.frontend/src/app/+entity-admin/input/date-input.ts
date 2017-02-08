import {
    Component,
    Optional,
    Inject,
    Input,
    ViewChild,
} from '@angular/core';

import {
    NgModel,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {ValueAccessorBase} from "./value-accessor";

@Component({
    selector: 'date-input',
    template: `
    <md2-datepicker type="date" [name]="name" placeholder="{{label | translate}}" format="{{format}}" [(ngModel)]="value" class="form-input"></md2-datepicker>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: DateInputComponent,
        multi: true,
    }],
})
export class DateInputComponent extends ValueAccessorBase<string> {
    @Input() public name: string;
    @Input() public label: string;
    @Input() public format: string;

    @ViewChild(NgModel) model: NgModel;

    public identifier = `date-input-${identifier++}`;

    constructor() {
        super();
    }
}

let identifier = 0;