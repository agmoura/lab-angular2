import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {EntityBase} from "../shared/model/models";
import {HandleErrorsComponent} from "../shared/components/handle-errors.component";
import {DataService} from "../shared/services/data.service";
import {EntityListComponent} from "./entity-list.component";

@Component({
    selector: 'entity-edit',
    templateUrl: './entity-edit.component.html',
    moduleId: module.id,
    directives: [HandleErrorsComponent],
    providers: [DataService],
})
export class EntityEditComponent implements OnInit {

    entityName:string;
    entitySchema:any;
    entity:EntityBase = <EntityBase>{};
    /*categorias:CategoriaObjetivo[] = [];
    unidades:UnidadeOrganizacional[] = [];*/
    errors:any;

    constructor(private route:ActivatedRoute, private router:Router, private dataService:DataService) { }

    ngOnInit() {
        this.entityName = this.route.snapshot.params['entity'];
        this.entitySchema = EntityListComponent.schemas[this.entityName];
        this.load(this.route.snapshot.params['id'])
    }

    load(id:string) {
        if (id)
            this.dataService.get<EntityBase>(this.entityName, id).subscribe(
                data => this.entity = data
            );

        /*this.dataService.findAll('categoriaObjetivo').subscribe(
            data => this.categorias = data.list
        );

        this.dataService.findAll('unidadeOrganizacional').subscribe(
            data => this.unidades = data.list
        );*/
    }

    save(entity:EntityBase) {
        this.dataService.save(this.entityName, entity).subscribe(
            data => this.entity = data,
            error => this.errors = error,
            () => this.goBack()
        );
    }

    goBack() {
        this.router.navigate(['entity', this.entityName]);
    }
}
