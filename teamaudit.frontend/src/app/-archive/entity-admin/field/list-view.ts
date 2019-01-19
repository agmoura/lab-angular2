import {Component, OnInit, OnDestroy, ContentChildren, QueryList, AfterContentInit} from '@angular/core';
import {ResourceService} from "../shared/resource.service";
import {DataService} from "../../../shared/services/data.service";
import {Page} from "../../../shared/model/paged-list";
import {ResourceQuery} from "../../../shared/model/query";
import {TableDataComponent} from "./table-data";

@Component({
    selector: 'list-view',
    template: `
        <div class="col-md-12">
            <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title"><i class="zmdi zmdi-filter-list"></i>Manter {{resource | translate}}</h3>
                </div>
                <div class="card-block">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `
})
export class ListViewComponent implements OnInit, OnDestroy, AfterContentInit {

    @ContentChildren(TableDataComponent) children: QueryList<TableDataComponent>;
    resource: string;
    resourceQuery: ResourceQuery;
    page: Page;

    constructor(private resourceService: ResourceService, private dataService: DataService) {

    }

    ngOnInit() {
        this.page = new Page();
        this.page.size = 0;
        this.resourceQuery = new ResourceQuery(this.resourceService.resource);
        this.resourceService.load.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {

    }

    public ngAfterContentInit(): void {
        this.children.forEach(child => child.onEdit.subscribe(record => this.onEdit(record)));
    }

    public load() {

        this.dataService.find(this.resourceQuery)
            .subscribe(
                data => {
                    this.children.forEach(child => child.data = data.list);
                    this.resourceQuery.pageItem(this.page = new Page(data.page));
                }
            );
    }

    onCreate() {
        //this.router.navigate(['entity', this.source, 'edit']);
    }

    onEdit(record: any) {
        this.resourceService.edit.next(record.id);
    }
}
