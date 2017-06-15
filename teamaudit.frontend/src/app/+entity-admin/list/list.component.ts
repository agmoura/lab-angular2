import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EntitySchemaService} from "../entity-schema.service";
import {ListViewSchema} from "../model/schema";

@Component({
    selector: 'list',
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    routeSubscription: any;
    resource: string;
    listViewSchema: ListViewSchema;

    constructor(private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.routeSubscription = this.route.data.subscribe(item => {
            this.resource = item['schema'].resource;
            this.listViewSchema = item['schema'].listView;
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    onCreate() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    onEdit(id: string) {
        this.router.navigate(['edit', id], {relativeTo: this.route});
    }
}
