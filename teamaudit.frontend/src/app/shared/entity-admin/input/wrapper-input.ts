import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {FormFieldSchema} from "../model/schema";

@Component({
    selector: 'wrapper-input',
    template: `
        <nz-form-item [hidden]="schema.hidden">
            <nz-form-label [nzSm]="6" [nzXs]="24" [nzFor]="schema.index" [nzRequired]="schema.required">
                {{schema.label | translate}}
            </nz-form-label>
            <nz-form-control [nzSm]="18" [nzXs]="24">
                <!--<input nz-input type="text" [id]="schema.index" [formControlName]="schema.source" [placeholder]="schema.label | translate" [required]="schema.required" >-->
                <ng-content></ng-content>
                <ng-container *ngIf="control.errors && (control.dirty || control.touched)">
                    <nz-form-explain *ngFor="let error of control.errors | keyvalue">
                        {{ ('VALIDATORS.' + error.key).toUpperCase() | translate: getParameters(schema.label | translate, error.value) }}
                    </nz-form-explain>
                </ng-container>
            </nz-form-control>
        </nz-form-item>
    `
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