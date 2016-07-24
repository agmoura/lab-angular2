import {Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'handle-errors',
    template: `
    <div *ngIf="_errors.length > 0" class="alert alert-danger alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <ul>
            <li *ngFor="let error of _errors">
                <span>{{error}}</span>
            </li>
        </ul>
    </div>
    `
})
export class HandleErrorsComponent {
    _errors:string[] = [];

    constructor() { }

    @Input()
    set errors(errorData:any) {
        this._errors.length = 0;

        if (errorData) {

            // Handle Bean Validations
            if (errorData.errors) {
                this._errors = errorData.errors.map(e => e.field + ' - ' + e.defaultMessage);
            }

            // Handle Other Exceptions
            else if (errorData.message) {
                this._errors.push(errorData.message);
                while (errorData.cause) {
                    errorData = errorData.cause;
                    this._errors.push(errorData.message);
                }
            }

            else {
                this._errors.push("Ocorreu um erro desconhecido.");
                this._errors.push(errorData);
            }
        }
    }
}