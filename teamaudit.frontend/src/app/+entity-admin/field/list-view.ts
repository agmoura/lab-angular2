import {Component, OnInit, OnDestroy, ContentChildren, QueryList, AfterContentInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EntitySchemaService} from "../entity-schema.service";
import {ListViewSchema} from "../../shared/model/schema";
import {ResourceService} from "../shared/resource.service";
import {DataService} from "../../shared/services/data.service";
import {MdSnackBar} from "@angular/material";
import {Page} from "../../shared/model/paged-list";
import {ResourceQuery} from "../../shared/model/query";
import {TableDataComponent} from "./table-data";

@Component({
    selector: 'list-view',
    template: `
    <div class="page-content">
        <md-card class="page-card">
            <md-card-title>
                <span>Manter {{resourceService.resource | translate}}</span>
                <a class="" (click)="onCreate()"><i class="material-icons">add</i></a>
                <a class="card-title-menu" [md-menu-trigger-for]="cardTitleMenu"><i class="material-icons">more_vert</i></a>
                <md-menu #cardTitleMenu="mdMenu">
                    <button md-menu-item>Action 1</button>
                    <button md-menu-item>Action 2</button>
                    <button md-menu-item>Action 3</button>
                </md-menu>
            </md-card-title>
            <md-card-content>
                <ng-content></ng-content>
            </md-card-content>
        </md-card>
    </div>
    `
})
export class ListViewComponent implements OnInit, OnDestroy, AfterContentInit {

    @ContentChildren(TableDataComponent) children: QueryList<TableDataComponent>;
    resourceQuery: ResourceQuery;
    page: Page;

    constructor(private resourceService: ResourceService, private dataService: DataService, public snackBar: MdSnackBar) {

    }

    ngOnInit() {
        this.page = new Page();
        this.page.size = 0;
        this.resourceQuery = new ResourceQuery(this.resourceService.resource).pageItem(this.page);
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
                },
                error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK')
            );
    }

    onCreate() {
        //this.router.navigate(['entity', this.source, 'edit']);
    }

    onEdit(record: any) {
        this.resourceService.edit.next(record.id);
    }
}
