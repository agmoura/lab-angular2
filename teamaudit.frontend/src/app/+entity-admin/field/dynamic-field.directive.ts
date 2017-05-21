import {ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FieldType, FormFieldSchema} from "../model/schema";
import {FieldComponent} from "../model/field";
import {TextInputComponent} from "../input/text-input";
import {BooleanInputComponent} from "../input/boolean-input";
import {NumberInputComponent} from "../input/number-input";
import {DateInputComponent} from "../input/date-input";
import {SelectInputComponent} from "../input/select-input";

const components: {[type: number]: Type<FieldComponent>} = {
    [FieldType.Text]: TextInputComponent,
    [FieldType.Boolean]: BooleanInputComponent,
    [FieldType.Number]: NumberInputComponent,
    [FieldType.Date]: DateInputComponent,
    [FieldType.Reference]: SelectInputComponent
};

// REFERENCE: https://toddmotto.com/angular-dynamic-components-forms
@Directive({
    selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges {
    @Input('dynamicField') schema: FormFieldSchema;
    @Input() group: FormGroup;
    component: ComponentRef<FieldComponent>;

    constructor(private container: ViewContainerRef, private resolver: ComponentFactoryResolver) {

    }

    ngOnInit() {
        const factory = this.resolver.resolveComponentFactory(components[this.schema.type]);
        this.component = this.container.createComponent(factory);
        this.component.instance.schema = this.schema;
        this.component.instance.group = this.group;
    }

    ngOnChanges() {
        if (this.component) {
            this.component.instance.schema = this.schema;
            this.component.instance.group = this.group;
        }
    }
}
