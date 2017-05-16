import {ComponentFactoryResolver, Directive, Input, OnInit, Type, ViewContainerRef} from '@angular/core';

// REFERENCE: https://toddmotto.com/angular-dynamic-components-forms
@Directive({
    selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
    @Input('dynamicField') inputType: Type<any>;
    @Input() name: string;
    @Input() label: string;

    constructor(private container: ViewContainerRef, private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        let factory = this.resolver.resolveComponentFactory(this.inputType);
        let component = this.container.createComponent(factory);
        component.instance.name = this.name;
        component.instance.label = this.label;
    }
}
