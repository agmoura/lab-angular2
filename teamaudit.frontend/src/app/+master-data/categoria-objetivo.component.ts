import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ResourceService} from "../+entity-admin/shared/resource.service";

@Component({
    selector: 'categoria-objetivo',
    templateUrl: 'categoria-objetivo.component.html',
    providers: [ResourceService]
})
export class CategoriaObjetivoComponent implements OnInit {

    /*data = [
        {nome: 'Categoria 1', descricao: 'Descricao 1', indicadorInternoSistema: false},
        {nome: 'Categoria 2', descricao: 'Descricao 2', indicadorInternoSistema: false},
        {nome: 'Categoria 3', descricao: 'Descricao 3', indicadorInternoSistema: true},
        {nome: 'Categoria 4', descricao: 'Descricao 4', indicadorInternoSistema: false}
    ];*/

    constructor(private resourceService: ResourceService) {
        this.resourceService.resource = 'categoriaObjetivo'
    }

    ngOnInit() {

    }

    get record() {
        return this.resourceService.resourceRecord;
    }

}