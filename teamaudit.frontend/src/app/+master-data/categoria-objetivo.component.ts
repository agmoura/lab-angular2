import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'categoria-objetivo',
    templateUrl: 'categoria-objetivo.component.html'
})
export class CategoriaObjetivoComponent implements OnInit {

    data = [
        {nome: 'Categoria 1', descricao: 'Descricao 1', indicadorInternoSistema: false},
        {nome: 'Categoria 2', descricao: 'Descricao 2', indicadorInternoSistema: false},
        {nome: 'Categoria 3', descricao: 'Descricao 3', indicadorInternoSistema: true},
        {nome: 'Categoria 4', descricao: 'Descricao 4', indicadorInternoSistema: false}
    ];

    record: any;

    constructor() {
    }

    ngOnInit() {
    }
}