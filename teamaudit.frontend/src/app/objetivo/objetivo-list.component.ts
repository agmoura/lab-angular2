import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Objetivo} from "../shared/model/models";
import {DataService} from "../shared/services/data.service";
import {Page} from "../shared/model/paged-list";

@Component({
    selector: 'objetivo-list',
    templateUrl: './objetivo-list.component.html',
})
export class ObjetivoListComponent implements OnInit {

    objetivos: Objetivo[] = [];
    page: Page = new Page();
    errors: any;

    constructor(private router: Router, private dataService: DataService) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.dataService.findAll('objetivo', this.page, ['nome asc', 'categoriaObjetivo.nome desc']).subscribe(
            data => {
                this.objetivos = data.list;
                this.page = new Page(data.page);
            },
            error => this.errors = error
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

    delete(objetivo: Objetivo) {
        if (confirm('Tem certeza que deseja exluir esse registro (' + objetivo.nome) + ')?') {
            this.dataService.delete("objetivo", objetivo.id).subscribe(
                data => this.load(),
                error => this.errors = error
            );
        }
    }

    gotoEdit(objetivo: Objetivo = null) {
        if (objetivo)
            this.router.navigate(['objetivo/edit', objetivo.id]);
        else
            this.router.navigate(['objetivo/edit']);
    }
}