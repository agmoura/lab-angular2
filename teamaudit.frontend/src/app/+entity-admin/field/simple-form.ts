import {Component, Input, ContentChildren, QueryList, AfterContentInit, OnInit, OnChanges, ViewContainerRef, ComponentFactoryResolver, Type, Directive, SimpleChanges, ViewChild} from '@angular/core';
import {FieldComponent} from "./field";
import {TextInputComponent} from "../input/text-input";
import {BooleanInputComponent} from "../input/boolean-input";
import {DateInputComponent} from "../input/date-input";
import {NumberInputComponent} from "../input/number-input";
import {NgModel, NgForm} from "@angular/forms";

@Component({
    selector: 'simple-form',
    template: `
    <form #form="ngForm">
        <ng-content></ng-content>
        <button (click)="save(form)">SAVE</button>
    </form>
    <strong>form.value:</strong> {{form.value | json}}
    `
})
export class SimpleFormComponent implements AfterContentInit, OnChanges {
    @Input() record = {};
    @ContentChildren(NgModel) models: QueryList<NgModel>;
    @ViewChild(NgForm) form: NgForm;

    constructor() {
    }

    public ngAfterContentInit(): void {
        //let ngContentModels = this.models.toArray();
        this.models.forEach((model) => this.form.addControl(model));
    }

    ngOnChanges(changes: SimpleChanges): void {
        /* if(this.fields && changes['record'])
         this.refresh();*/
    }

    /*refresh() {
     //this.fields.forEach(field => field.model.value = this.record[field.name]);
     }*/

    save(record: any) {
        let i = 100;
    }
}