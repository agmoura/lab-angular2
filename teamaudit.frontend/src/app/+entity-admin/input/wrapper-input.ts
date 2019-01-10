import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {FormFieldSchema} from "../model/schema";

@Component({
    selector: 'wrapper-input',
    template: `
        <div class="form-group row" [hidden]="schema.hidden">
            <label [for]="schema.index" class="col-md-2 col-form-label">{{schema.label | translate}}</label>
            <div class="col-md-10">
                <ng-content></ng-content>
                <ng-container *ngIf="control.errors && (control.dirty || control.touched)">
                    <small *ngFor="let error of control.errors | keyvalue" class="text-danger">
                        {{ ('VALIDATORS.' + error.key).toUpperCase() | translate: getParameters(schema.label | translate, error.value) }}
                    </small>
                </ng-container>
            </div>
        </div>
    `,
    styles: [".text-danger {display: block}"]
})
export class WrapperInputComponent implements OnInit {
    @Input() schema: FormFieldSchema<any>;
    @Input() formGroup: FormGroup;
    public control: AbstractControl;

    public ngOnInit(): void {
        this.control = this.formGroup.get(this.schema.source);
    }

    public getParameters(label: string, error: any) {
        return {label: label, ...error};
    }
}