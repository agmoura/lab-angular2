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

//import {ElementBase, animations} from '../form';
import {ValueAccessorBase} from "./value-accessor";

@Component({
    selector: 'text-input',
    template: `
    <div>
        <label *ngIf="label" [attr.for]="identifier">{{label}}</label>
        <input
            type="text"
            class="form-control"
            [placeholder]="placeholder"
            [(ngModel)]="value"
            [ngClass]="{invalid: (invalid | async)}"
            [id]="identifier"
        />
    </div>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: TextInputComponent,
        multi: true,
    }],
})
export class TextInputComponent extends ValueAccessorBase<string> {
    @Input() public label: string;
    @Input() public placeholder: string;

    @ViewChild(NgModel) model: NgModel;

    public identifier = `form-text-${identifier++}`;

    constructor() {
        super();
    }
}

let identifier = 0;