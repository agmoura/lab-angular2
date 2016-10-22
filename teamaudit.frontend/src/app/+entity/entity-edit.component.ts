import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {EntityBase} from '../shared/model/models';
import {DataService} from '../shared/services/data.service';
import {EntitySchema} from '../shared/model/schema';
import {EntitySchemaService} from './entity-schema.service';

@Component({
    selector: 'entity-edit',
    templateUrl: 'entity-edit.template.html',
})
export class EntityEditComponent implements OnInit {

    entityName: string;
    entitySchema: EntitySchema;
    entity: EntityBase = <EntityBase>{};
    entityReferences: any = {};
    errors: any;

    constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private schemaService: EntitySchemaService) {
    }

    ngOnInit() {
        this.entityName = this.route.snapshot.params['entity'];
        this.entitySchema = this.schemaService.getEntitySchema(this.entityName);
        this.load(this.route.snapshot.params['id']);
    }

    load(id: string) {
        if (id)
            this.dataService.get<EntityBase>(this.entityName, id).subscribe(
                data => this.entity = data
            );

        this.entitySchema.formView.fields
            .filter(field => field.type === 'select')
            .forEach(field => {

                let path = field.referencePath || field.path;
                let projections = [field.select.value, field.select.text];

                this.dataService.findAll(path, null, [field.select.text], null, projections).subscribe(
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
