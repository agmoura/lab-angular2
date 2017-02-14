import {Component, OnInit, Input, ContentChildren, QueryList} from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {MdSnackBar} from "@angular/material";
import {ResourceQuery} from "../../shared/model/query";
import {SelectInputComponent} from "../input/select-input";

@Component({
    selector: 'reference-input',
    template: '<ng-content></ng-content>'
})
export class ReferenceInputComponent implements OnInit {
    @Input() resource: string;
    @ContentChildren(SelectInputComponent) fields: QueryList<SelectInputComponent>;
    resourceQuery: ResourceQuery;

    constructor(private dataService: DataService, public snackBar: MdSnackBar) {

    }

    ngOnInit() {
        this.resourceQuery = new ResourceQuery(this.resource);
        this.load();
    }

    public load() {

        this.dataService.find(this.resourceQuery)
            .subscribe(
                data => {
                    this.fields.forEach(field => field.items = data.list);
                },
                error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK')
            );
    }
}
