import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EntitySchemaService} from "../entity-schema.service";
import {ListViewSchema} from "../../shared/model/schema";

@Component({
    selector: 'list',
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    routeSubscription: any;
    resource: string;
    listViewSchema: ListViewSchema;

    constructor(private route: ActivatedRoute, private router: Router, private schemaService: EntitySchemaService) {

    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            this.resource = params['entity'];
            this.listViewSchema = this.schemaService.getSchema(this.resource).listView;
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    onCreate() {
        this.router.navigate(['entity', this.resource, 'edit']);
    }

    onEdit(id: string) {
        this.router.navigate(['entity', this.resource, 'edit', id]);
    }
}
