import {Component, Input, OnInit} from '@angular/core';
import {CategoriaObjetivo} from "../shared/model/models";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'categoria-objetivo-edit',
    template: `
        <span>CATEGORIA 5</span>

        <div class="form-group">
            <label>ID:</label>
            <input type="text" name="id" [ngModel]="model?.id" (ngModelChange)="model.id = $event" class="form-control">
        </div>

        <div class="form-group">
            <label>Descrição:</label>
            <input type="text" name="descricao" [ngModel]="model?.descricao" (ngModelChange)="model.descricao = $event" class="form-control">
        </div>

        <div class="form-group">
            <label>Nome:</label>
            <input type="text" name="nome" [ngModel]="model?.nome" (ngModelChange)="model.nome = $event" class="form-control">
        </div>
    `,
})
export class CategoriaObjetivoEditComponent {

    @Input() model = new CategoriaObjetivo();
    @Input() form: NgForm;

    constructor() {
    }

    setValue() {
        /*this.value = {nome:'NOME2', descricao:'DESCRICAO2'};*/
    }
}