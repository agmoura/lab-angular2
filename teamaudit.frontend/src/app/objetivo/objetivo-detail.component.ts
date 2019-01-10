import {Component, Input, OnInit} from '@angular/core';
import {ValueAccessorBase} from "../+entity-admin/field/value-accessor";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CategoriaObjetivo} from "../shared/model/models";

@Component({
    selector: 'objetivo-detail',
    template: `
        <span>CATEGORIA1</span>

        <div class="form-group">
            <label>ID:</label>
            <input type="text" [ngModel]="value?.id" (ngModelChange)="value.id = $event" class="form-control">
        </div>

        <div class="form-group">
            <label>Descrição:</label>
            <input type="text" [ngModel]="value?.descricao" (ngModelChange)="value.descricao = $event" class="form-control">
        </div>

        <div class="form-group">
            <label>Nome:</label>
            <input type="text" [ngModel]="value?.nome" (ngModelChange)="value.nome = $event" class="form-control">
        </div>
        
        <button (click)="setValue()">SETVALUE</button>

    `,
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: ObjetivoDetailComponent, multi: true,}]
})
export class ObjetivoDetailComponent extends ValueAccessorBase<CategoriaObjetivo> {

    constructor() {
        super();
    }

    setValue() {
        /*this.value = {nome:'NOME2', descricao:'DESCRICAO2'};*/
    }
}