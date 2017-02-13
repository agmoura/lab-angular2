import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EntitySchemaService} from "../entity-schema.service";
import {ListViewSchema} from "../../shared/model/schema";
import {ResourceService} from "../shared/resource.service";
import {DataService} from "../../shared/services/data.service";
import {MdSnackBar} from "@angular/material";
import {Page} from "../../shared/model/paged-list";
import {EntityQuery} from "../../shared/model/query";

@Component({
    selector: 'list-view',
    template: `
    <div class="page-content">
        <md-card class="page-card">
            <md-card-title>
                <span>Manter {{resourceService.resource | translate}}</span>
                <a class="card-title-menu" md-ripple [md-menu-trigger-for]="cardTitleMenu">
                    <i class="material-icons">more_vert</i>
                </a>
                <md-menu #cardTitleMenu="mdMenu">
                    <button md-menu-item>Ação 1</button>
                    <button md-menu-item>Ação 2</button>
                    <button md-menu-item>Ação 3</button>
                </md-menu>
            </md-card-title>
            <md-card-content>
                <ng-content></ng-content>
            </md-card-content>
        </md-card>
    </div>
    `
})
export class ListViewComponent implements OnInit, OnDestroy {
    entityQuery: EntityQuery;
    page: Page;

    constructor(private resourceService: ResourceService, private dataService: DataService, public snackBar: MdSnackBar) {

    }

    ngOnInit() {
        this.page = new Page();
        this.page.size = 0;
        this.entityQuery = new EntityQuery(this.resourceService.resource).pageItem(this.page);
        this.resourceService.load.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {

    }

    public load() {

        this.dataService.find(this.entityQuery)
            .subscribe(
                data => {
                    this.resourceService.resourceData = data.list;
                    this.entityQuery.pageItem(this.page = new Page(data.page));
                },
                error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK')
            );
    }

    onCreate() {
        //this.router.navigate(['entity', this.source, 'edit']);
    }

    onEdit(id: string) {
        //this.router.navigate(['entity', this.source, 'edit', id]);
    }
}
