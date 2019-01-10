import {Component, OnInit, OnDestroy, ContentChildren, QueryList, AfterContentInit, Input, SkipSelf, OnChanges, SimpleChanges} from '@angular/core';
import {ResourceService} from "../shared/resource.service";
import {DataService} from "../../shared/services/data.service";
import {Page} from "../../shared/model/paged-list";
import {ResourceQuery} from "../../shared/model/query";
import {TableDataComponent} from "./table-data";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
    selector: 'reference-one-many',
    template: `
    <ng-content></ng-content>
    `,
    providers: [ResourceService]
})
export class ReferenceOneToManyComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {

    @Input() resource: string;
    @Input() target: string;
    @Input() targetId: string;
    @ContentChildren(TableDataComponent) children: QueryList<TableDataComponent>;
    resourceQuery: ResourceQuery;
    page: Page;

    constructor(private resourceService: ResourceService,
                @SkipSelf() private parentResourceService: ResourceService,
                private dataService: DataService) {

    }

    ngOnInit() {
        this.resourceService.load.subscribe(() => this.load());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.resource && this.target && this.targetId)
            this.setup();
    }

    ngOnDestroy() {

    }

    public ngAfterContentInit(): void {
        this.children.forEach(child => child.onEdit.subscribe(record => this.onEdit(record)));
    }

    private setup() {
        this.resourceService.resource = this.resource;

        this.page = new Page();
        this.page.size = 0;
        this.resourceQuery = new ResourceQuery(this.resourceService.resource)
            .where({[this.target]: {eq: this.targetId}})
            .pageItem(this.page)

        this.load();
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
