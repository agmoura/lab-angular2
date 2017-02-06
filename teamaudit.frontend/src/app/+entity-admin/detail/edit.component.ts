import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {EntityBase} from '../../shared/model/models';
import {DataService} from '../../shared/services/data.service';
import {EntitySchema, FieldType} from '../../shared/model/schema';
import {EntitySchemaService} from '../entity-schema.service';
import {EntityQuery} from "../../shared/model/query";

@Component({
    selector: 'edit',
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit, OnChanges {

    @Input() entityName: string;
    @Input() entityId: string;

    entitySchema: EntitySchema;
    entity: EntityBase = <EntityBase>{};

    entityReferences: any = {};
    errors: any;

    FieldType: typeof FieldType = FieldType;

    constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private schemaService: EntitySchemaService) {
    }

    ngOnInit() {
        this.entityName = this.route.snapshot.params['entity'];
        this.entityId= this.route.snapshot.params['id'];
        this.setup();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.setup();
    }

    setup(){
        this.entitySchema = this.schemaService.getEntitySchema(this.entityName);
        this.load(this.entityId);
    }

    load(id: string) {
        if (id)
            this.dataService.get<EntityBase>(this.entityName, id).subscribe(
                data => this.entity = data
            );

        this.entitySchema.formView.fields
            .filter(field => field.type === FieldType.Reference)
            .forEach(field => {

                var entityQuery = new EntityQuery(field.referencePath || field.path)
                    .select(field.select.value)
                    .select(field.select.text)
                    .orderBy(field.select.text);

                this.dataService.find(entityQuery).subscribe(
                    data => this.entityReferences[field.path] = data.list
                );
            });
    }

    // Remove Undefined, Null and Empty Attributes
    cleanEntity(entity: EntityBase) {
        for (let attribute in entity) {
            if (!entity[attribute]) {
                delete entity[attribute];
            }
            else if (typeof entity[attribute] === 'object') {
                this.cleanEntity(entity[attribute]);

                if (Object.keys(entity[attribute]).length === 0)
                    delete entity[attribute];
            }
        }
    }

    save(entity: EntityBase) {

        this.cleanEntity(entity);

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
