import {Component, OnInit, OnDestroy, OnChanges, Input, SimpleChanges} from '@angular/core';
import {EntityBase} from '../../shared/model/models';
import {DataService} from '../../shared/services/data.service';
import {MdSnackBar} from "@angular/material";
import {ResourceService} from "../shared/resource.service";
import {TableDataComponent} from "./table-data";

@Component({
    selector: 'edit-view',
    templateUrl: 'edit-view.html'
})
export class EditViewComponent implements OnInit, OnChanges {

    @Input() resource: string;
    @Input() resourceId: string;
    @Input() target: string;
    @Input() targetId: string;


    constructor(private resourceService: ResourceService,
                private dataService: DataService,
                public snackBar: MdSnackBar) {
    }

    ngOnInit() {
        this.resource = this.resourceService.resource;

        this.resourceService.edit.subscribe(
            resourceId => this.load(this.resourceId = resourceId)
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.load(this.resourceId);
    }

    load(id: string) {
        if (id)
            this.dataService.get<any>(this.resource, id).subscribe(
                data => this.resourceService.resourceRecord = data
            );

        /*this.formViewSchema.fields
         .filter(field => field.type === FieldType.Reference)
         .forEach(field => {

         var resourceQuery = new ResourceQuery(field.referencePath || field.resource)
         .select(field.select.value)
         .select(field.select.text)
         .orderBy(field.select.text);

         this.dataService.find(resourceQuery).subscribe(
         data => this.referencesData[field.resource] = data.list
         );
         });*/
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

    save() {
        //this.cleanEntity(this.resourceService.resourceRecord);

        //TODO: Refatorar código
        /*if (this.target) {
         let targetPath: string[] = this.target.split('.');

         if(targetPath.length > 1) {
         if (!entity[targetPath[0]]) entity[targetPath[0]] = {[targetPath[1]]: this.targetId};
         }
         else {
         entity[targetPath[0]] = [{id: this.targetId}];
         }
         }*/

        this.dataService.save(this.resource, this.resourceService.resourceRecord).subscribe(
            data => this.resourceService.resourceRecord = data,
            error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK'),
            () => {
                this.resourceId = this.resourceService.resourceRecord.id;
                this.snackBar.open('Operação realizada com sucesso', 'OK', {duration: 2000})
            }
        );
    }

    goBack() {
        this.resourceId = null;
        this.resourceService.load.next();
    }
}
