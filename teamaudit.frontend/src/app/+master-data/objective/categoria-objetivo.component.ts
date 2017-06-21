import {Component, OnInit} from '@angular/core';
import {ResourceService} from "../../+entity-admin";

@Component({
    selector: 'categoria-objetivo',
    templateUrl: 'categoria-objetivo.component.html',
    providers: [ResourceService]
})
export class CategoriaObjetivoComponent implements OnInit {

    constructor(private resourceService: ResourceService) {
        this.resourceService.resource = 'categoriaObjetivo'
    }

    ngOnInit() {

    }

    get record() {
        return this.resourceService.resourceRecord;
    }
}