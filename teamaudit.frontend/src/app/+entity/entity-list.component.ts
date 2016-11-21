import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {EntitySchema} from "../shared/model/schema";
import {DataService} from "../shared/services/data.service";
import {Page} from "../shared/model/paged-list";
import {EntitySchemaService} from "./entity-schema.service";
import {EntityQuery} from "../shared/model/query";

@Component({
    selector: 'entity-list',
    templateUrl: 'entity-list.template.html',
})
export class EntityListComponent implements OnInit {

    routeSubscription: any;
    entityName: string;
    entitySchema: EntitySchema;
    entityQuery: EntityQuery;
    entityList = [];
    gridData: any[] =
        [{
            "ProductID": 1,
            "ProductName": "Chai",
            "UnitPrice": 18.0000,
            "Discontinued": true
        }, {
            "ProductID": 2,
            "ProductName": "Chang",
            "UnitPrice": 19.0000,
            "Discontinued": false
        }, {
            "ProductID": 3,
            "ProductName": "Aniseed Syrup",
            "UnitPrice": 10.0000,
            "Discontinued": false
        }, {
            "ProductID": 4,
            "ProductName": "Chef Anton's Cajun Seasoning",
            "UnitPrice": 22.0000,
            "Discontinued": false
        }, {
            "ProductID": 5,
            "ProductName": "Chef Anton's Gumbo Mix",
            "UnitPrice": 21.3500,
            "Discontinued": false
        }, {
            "ProductID": 6,
            "ProductName": "Grandma's Boysenberry Spread",
            "UnitPrice": 25.0000,
            "Discontinued": false
        }];
    page: Page;
    errors: any;

    gridColumns: any[];

    constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private schemaService: EntitySchemaService) {

    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            this.entityName = params['entity'];
            this.entitySchema = this.schemaService.getEntitySchema(this.entityName);
            this.page = new Page();
            this.page.size = 0;

            this.entityQuery = new EntityQuery(this.entityName)
                .selectList(this.entitySchema.listView.fields.map(field => field.path))
                .select(this.entitySchema.id.path)
                .pageItem(this.page)
                .orderByList(this.entitySchema.listView.sorts);

            this.entitySchema.id.index = this.entityQuery.projections.length - 1;

            this.gridColumns = this.entitySchema.listView.fields.map((field, index) => {
                let columnOption: any = {dataField: `${field.index}`, caption: field.label};
                if (field.required) columnOption.validationRules = [{type: "required"}];
                return columnOption
            });

            this.load();
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    load() {
        /*let projections = this.entitySchema.listView.fields.map(field => field.path);
        projections.splice(0, 0, this.entitySchema.id.path);*/

        this.dataService.find(this.entityQuery)
            .subscribe(
                data => {
                    this.entityList = data.list;
                    this.entityQuery.pageItem(this.page = new Page(data.page));
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

    delete(entity: any) {
        if (confirm('Tem certeza que deseja exluir esse registro ?')) {
            this.dataService.delete(this.entityName, entity[this.entitySchema.id.index]).subscribe(
                data => this.load(),
                error => this.errors = error
            );
        }
    }

    gotoEdit(entity: any = null) {
        if (entity)
            this.router.navigate(['entity', this.entityName, 'edit', entity[this.entitySchema.id.index]]);
        else
            this.router.navigate(['entity', this.entityName, 'edit']);
    }
}
