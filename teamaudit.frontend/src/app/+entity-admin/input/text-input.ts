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
    <div class="card-form-input" fxflex>
        <md-input-container>
            <input md-input [placeholder]="label" type="text" [(ngModel)]="value" [name]="name" required>
        </md-input-container>
        <!--<p class="text-danger" *ngIf="firstName.errors?.required">You must include a first name.</p>-->
    </div>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: TextInputComponent,
        multi: true,
    }],
})
export class TextInputComponent extends ValueAccessorBase<string> {
    @Input() public name: string;
    @Input() public label: string;
    @Input() public placeholder: string;

    @ViewChild(NgModel) model: NgModel;

    public identifier = `form-text-${identifier++}`;

    constructor() {
        super();
    }
}

let identifier = 0;