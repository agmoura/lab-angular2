import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'list',
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    routeSubscription: any;
    entityName: string;

    constructor(private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            this.entityName = params['entity'];
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    gotoEdit(id: string) {
        this.router.navigate(['entity', this.entityName, 'edit', id]);
    }
}
