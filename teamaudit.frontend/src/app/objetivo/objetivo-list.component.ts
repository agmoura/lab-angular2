import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {Objetivo} from "../shared/model/models";
import {DataService} from "../shared/services/data.service";
import {Page} from "../shared/model/paged-list";

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

    constructor(private router:Router, private dataService:DataService) { }

    ngOnInit() {
        this.load();
    }

    load() {
        this.dataService.findAll<Objetivo>('objetivos', this.page).subscribe(
            data => {
                this.objetivos = data.list;
                this.page = data.page;
            }
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
            this.dataService.delete(objetivo).subscribe(response => {
                this.load();
            });
        }
    }

    gotoEdit(objetivo:Objetivo = null) {
        if (objetivo)
            this.router.navigate(['objetivos/edit', objetivo.id]);
        else
            this.router.navigate(['objetivos/edit']);
    }
}