import {Component, Input, ContentChildren, QueryList, AfterContentInit, OnInit, OnChanges, ViewContainerRef, ComponentFactoryResolver, Type, Directive, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControlName, FormControl} from "@angular/forms";

@Component({
    selector: 'simple-form-reactive',
    template: `
    <form [formGroup]="form">
        <ng-content></ng-content>
        <button (click)="save()">SAVE2</button>
    </form>
    `
})
export class SimpleFormReactiveComponent implements AfterContentInit, OnChanges {
    @Input() record = {};
    @Input() form: FormGroup;
    @ContentChildren(FormControlName) controls: QueryList<FormControlName>;

    constructor(public formBuilder: FormBuilder) {
    }

    public ngAfterContentInit(): void {
        let group: any = {};
        this.controls.forEach((control) => group[control.name] = new FormControl(this.record[control.name]));
        this.form = new FormGroup(group);
    }

    ngOnChanges(changes: SimpleChanges): void {
        /* if(this.fields && changes['record'])
         this.refresh();*/
    }

    /*refresh() {
     //this.fields.forEach(field => field.model.value = this.record[field.name]);
     }*/

    save() {
        let i = 100;
    }
}