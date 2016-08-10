import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';

import {EntitySchema} from "../shared/model/schema";
import {DataService} from "../shared/services/data.service";
import {Page} from "../shared/model/paged-list";
import {HandleErrorsComponent} from "../shared/components/handle-errors.component";
import {EntitySchemaService} from "./entity-schema.service";

@Component({
    selector: 'entity-list',
    templateUrl: './entity-list.template.html',
    moduleId: module.id,
    directives: [ROUTER_DIRECTIVES, HandleErrorsComponent],
    providers: [DataService, EntitySchemaService]
})
export class EntityListComponent implements OnInit {

    routeSubscription:any;
    entityName:string;
    entitySchema:EntitySchema;
    entityList = [];
    page:Page;
    errors:any;
   
    constructor(private route:ActivatedRoute, private router:Router, private dataService:DataService, private schemaService:EntitySchemaService) {
        
    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            this.entityName = params['entity'];
            this.entitySchema = this.schemaService.getEntitySchema(this.entityName);
            this.page = new Page();
            this.load();
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    load() {
        let projections = this.entitySchema.listView.fields.map(field => field.path);
        projections.splice(0, 0, this.entitySchema.id.path);

        this.dataService.findAll(this.entityName, this.page, this.entitySchema.listView.sorts, null, projections)
            .subscribe(
                data => {
                    this.entityList = data.list;
                    this.page = new Page(data.page);
                },
                error => this.errors = error
            );
    }

    previousPage() {
        this.page.number--;
        this.load();
    }

    nextPage() {
        this.page.number++;
        this.load();
    }

    delete(entity:any) {
        if (confirm('Tem certeza que deseja exluir esse registro ?')) {
            this.dataService.delete(this.entityName, entity[0]).subscribe(
                data => this.load(),
                error => this.errors = error
            );
        }
    }

    gotoEdit(entity:any = null) {
        if (entity)
            this.router.navigate(['entity', this.entityName, 'edit', entity[0]]);
        else
            this.router.navigate(['entity', this.entityName, 'edit']);
    }
}