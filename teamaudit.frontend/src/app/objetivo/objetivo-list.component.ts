import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {Objetivo} from "../shared/model/models";
import {DataService} from "../shared/services/data.service";
import {Page} from "../shared/model/paged-list";
import {stringify} from "@angular/platform-browser-dynamic/src/facade/lang";

@Component({
    selector: 'objetivo-list',
    templateUrl: './objetivo-list.component.html',
    //styleUrls: ['./app.css'],
    moduleId: module.id,
    directives: [ROUTER_DIRECTIVES],
    providers: [DataService]
})
export class ObjetivoListComponent implements OnInit {

    objetivos:Objetivo[] = [];
    page:Page = new Page();
    errors:string[] = [];

    constructor(private router:Router, private dataService:DataService) { }

    ngOnInit() {
        this.load();
    }

    load() {
        this.dataService.findAll('objetivo', this.page, ['nome asc', 'categoriaObjetivo.nome desc']).subscribe(
            data => {
                this.objetivos = data.list;
                this.page = data.page;
            },
            error => this.handleError(error.json())
        );
    }

    previousPage() {
        this.page.number--;
        this.load();
    }

    nextPage() {
        this.page.number++;
        this.load();
    }

    delete(objetivo:Objetivo) {
        if (confirm('Tem certeza que deseja exluir esse registro (' + objetivo.nome) + ')?') {
            this.dataService.delete("objetivo", objetivo).subscribe(
                data => this.load(),
                error => this.handleError(error.json())
            );
        }
    }

    gotoEdit(objetivo:Objetivo = null) {
        if (objetivo)
            this.router.navigate(['objetivo/edit', objetivo.id]);
        else
            this.router.navigate(['objetivo/edit']);
    }

    handleError(data:any) {

        this.errors.length = 0;

        // Handle Bean Validations
        if (data.errors) {
            this.errors = data.errors.map(e => e.field + ' - ' + e.defaultMessage);
        }

        // Handle Other Exceptions
        else if (data.message) {
            this.errors.push(data.message);
            while (data.cause) {
                data = data.cause;
                this.errors.push(data.message);
            }
        }

        else {
            this.errors.push("Ocorreu um erro desconhecido.");
            this.errors.push(data);
        }
    }
}