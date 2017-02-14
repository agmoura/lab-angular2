import {Component, ContentChildren, QueryList, AfterContentInit, ViewChild} from '@angular/core';
import {NgModel, NgForm} from "@angular/forms";

@Component({
    selector: 'simple-form',
    template: `
    <form #form="ngForm">
        <ng-content></ng-content>
    </form>
    <!--<strong>form.value:</strong> {{form.value | json}}-->
    `
})
export class SimpleFormComponent implements AfterContentInit {
    @ContentChildren(NgModel) models: QueryList<NgModel>;
    @ViewChild(NgForm) form: NgForm;

    constructor() {

    }

    public ngAfterContentInit(): void {
        //this.models.forEach((model) => this.form.addControl(model));
    }
}