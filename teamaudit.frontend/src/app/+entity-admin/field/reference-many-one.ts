import {Component, OnInit, Input, ContentChildren, QueryList} from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {ResourceQuery} from "../../shared/model/query";
import {SelectInputComponent} from "../input/select-input";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
    selector: 'reference-many-one',
    template: '<ng-content></ng-content>'
})
export class ReferenceManyToOneComponent implements OnInit {
    @Input() resource: string;
    @ContentChildren(SelectInputComponent) fields: QueryList<SelectInputComponent>;
    resourceQuery: ResourceQuery;

    constructor(private dataService: DataService) {

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
                }
            );
    }
}
