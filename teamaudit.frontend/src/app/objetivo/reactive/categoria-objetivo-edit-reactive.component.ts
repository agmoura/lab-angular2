import {Component} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'categoria-objetivo-edit-reactive',
    template: `
        <div [formGroup]="group">
            <span>CATEGORIA REACTVE</span>
            <div class="form-group">
                <label>ID:</label>
                <input type="text" formControlName="id" class="form-control">
            </div>
            <div class="form-group">
                <label>Nome:</label>
                <input type="text" formControlName="nome" class="form-control">
            </div>
            <div class="form-group">
                <label>Descrição:</label>
                <input type="text" formControlName="descricao" class="form-control">
            </div>
        </div>
    `,
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: CategoriaObjetivoEditReactiveComponent, multi: true}]
})
export class CategoriaObjetivoEditReactiveComponent implements ControlValueAccessor {
    group: FormGroup;

    constructor(builder: FormBuilder) {
        this.group = builder.group({
            id: [ ],
            nome: [''],
            descricao: ['']
        });
    }

    writeValue(value: any) {
        if (value) {
            this.group.patchValue(value);
        }
    }

    registerOnChange(fn: (value: any) => void) {
        this.group.valueChanges.subscribe(fn);
    }

    registerOnTouched() {
    }
}