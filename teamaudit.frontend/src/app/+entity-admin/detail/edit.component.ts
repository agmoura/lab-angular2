import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {Component, OnInit, OnDestroy, OnChanges, Input, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from "@angular/common";

import {EntityBase} from '../../shared/model/models';
import {DataService} from '../../shared/services/data.service';
import {FieldType, FormViewSchema} from '../../shared/model/schema';
import {EntitySchemaService} from '../entity-schema.service';
import {ResourceQuery} from "../../shared/model/query";
import {MdSnackBar} from "@angular/material";


@Component({
    selector: 'edit',
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

    @Input() resource: string;
    @Input() resourceId: string; // resourceId
    @Input() target: string;
    @Input() targetId: string;
    @Input() formViewSchema: FormViewSchema;

    FieldType: typeof FieldType = FieldType;
    routeSubscription: any;
    mainForm: FormGroup;
    entity: EntityBase = <EntityBase>{};
    referencesData: any = {};
    childEdit: any;

    constructor(private builder: FormBuilder,
                private route: ActivatedRoute,
                private location: Location,
                private dataService: DataService,
                private schemaService: EntitySchemaService,
                public snackBar: MdSnackBar) {
    }

    createForm(formViewSchema: FormViewSchema) {

        let group: any = {id: new FormControl()};

        formViewSchema.fields.forEach(field => {
            if(field.type !== FieldType.Reference)
                group[field.source] = new FormControl();
            else {
                group[field.source] = new FormGroup({[field.select.value]: new FormControl()});
            }
        });

        return new FormGroup(group);
    }

    ngOnInit() {

        document.querySelector('body').classList.toggle('aside-menu-hidden');

        if (!this.resource) {
            this.routeSubscription = this.route.params.subscribe(params => {
                this.resource = this.route.snapshot.params['entity'];
                this.resourceId = this.route.snapshot.params['id'];
                this.formViewSchema = this.schemaService.getSchema(this.resource).formView;

                this.mainForm = this.createForm(this.formViewSchema);

                this.load(this.resourceId);
            });
        }
    }

    ngOnDestroy() {
        if (this.routeSubscription) this.routeSubscription.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.load(this.resourceId);
    }

    load(id: string) {
        if (id)
            this.dataService.get<EntityBase>(this.resource, id).subscribe(data => {

                this.mainForm.patchValue(data);

                /*for (let field in this.mainForm.controls) {
                    this.mainForm.controls[field].setValue(data[field]);
                }*/

                this.entity = data;
            });

        this.formViewSchema.fields
            .filter(field => field.type === FieldType.Reference)
            .forEach(field => {

                var resourceQuery = new ResourceQuery(field.referencePath || field.source)
                    .select(field.select.value)
                    .select(field.select.text)
                    .orderBy(field.select.text);

                this.dataService.find(resourceQuery).subscribe(
                    data => this.referencesData[field.source] = data.list
                );
            });
    }

    // Remove Undefined, Null and Empty Attributes
    cleanEntity(entity: EntityBase) {
        for (let attribute in entity) {
            if (entity[attribute] == undefined || entity[attribute] == null) {
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

        //TODO: Refatorar código
        if (this.target) {
            let targetPath: string[] = this.target.split('.');

            if (targetPath.length > 1) {
                if (!entity[targetPath[0]]) entity[targetPath[0]] = {[targetPath[1]]: this.targetId};
            }
            else {
                entity[targetPath[0]] = [{id: this.targetId}];
            }
        }

        this.dataService.save(this.resource, entity).subscribe(
            data => this.entity = data,
            error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK'),
            () => {
                this.resourceId = this.entity.id;
                this.snackBar.open('Operação realizada com sucesso', 'OK', {duration: 2000})
            }
        );
    }

    delete() {
        this.dataService.delete(this.resource, this.resourceId).subscribe(
            data => data,
            error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK'),
            () => {
                this.resourceId = this.entity.id;
                this.snackBar.open('Operação realizada com sucesso', 'OK', {duration: 2000});
                this.goBack();
            }
        );
    }

    goBack() {
        //this.router.navigate(['entity', this.resource]);
        this.location.back();
    }

    /*execute() {
        let data2;

        this.dataService.executeAction<EntityBase>(this.resource).subscribe(
            data => data2 = data
        );
    }*/
}
