import {FormBuilder} from '@angular/forms';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FormViewSchema, ResourceSchema} from '../model/schema';

@Component({
    selector: 'edit',
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit, OnDestroy {

    public schema: ResourceSchema;
    public resource: string;
    public resourceId: string;
    public formViewSchema: FormViewSchema;
    public childEdit: any;
    private routeSubscription: any;

    constructor(private builder: FormBuilder,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit() {
        this.routeSubscription = this.route.data.subscribe(data => {
            this.schema = data.schema();
            this.resource = this.schema.resource;
            this.formViewSchema = this.schema.formView;
            this.resourceId = this.route.snapshot.params['id'];
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    public goBack() {
        //this.router.navigate(['entity', this.resource]);
        this.location.back();
    }
}
