import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {CategoriaRisco} from '../../shared/model/models';
import {Page} from '../../shared/model/paged-list';
import {TreeItem} from '../../shared/model/tree-list';
import {CategoriaRiscoService} from './categoria-risco.service';

@Component({
    selector: 'categoria-risco-list',
    templateUrl: './categoria-risco.component.html'
})
export class CategoriaRiscoComponent implements OnInit {

    categoriasRisco: CategoriaRisco[] = [];
    page: Page = new Page();
    errors: any;

    constructor(private router: Router, private service: CategoriaRiscoService) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.service.findAll('categoriaRisco', null, null, ['categoriaRiscoPai is null']).subscribe(data =>
            this.categoriasRisco = <CategoriaRisco[]> data.list.map(item => ({...item, level: 0}))
        );
    }

    expand(parent: CategoriaRisco & TreeItem, index: number) {
        if (parent.expanded === undefined) {
            parent.children = [];
            this.service.findAll('categoriaRisco', null, null, [`categoriaRiscoPai.id='${parent.id}'`]).subscribe(
                data => data.list.map(
                    item => {
                        item.level = parent.level + 1;
                        this.categoriasRisco.splice(++index, 0, item);
                        parent.children.push(item);
                    }),
                error => this.errors = error.json(),
                () => parent.expanded = !parent.expanded
            );
        }

        else {
            parent.expanded = !parent.expanded;
            this.expandRecursive(parent, parent.expanded);
        }
    }

    private expandRecursive(parent: TreeItem, expand: boolean) {
        if (parent.expanded === undefined) return;

        parent.children.map(
            (item: CategoriaRisco & TreeItem) => {
                item.hidden = !expand;
                if (!expand || item.expanded)
                    this.expandRecursive(item, expand);
            }
        )
    }

    delete(categoriaRisco: CategoriaRisco, index: number) {
        if (confirm('Tem certeza que deseja exluir esse registro (' + categoriaRisco.nome) + ')?') {
            this.service.delete('categoriaRisco', categoriaRisco.id).subscribe(
                data => this.categoriasRisco.splice(index, 1),
                error => this.errors = error
            );
        }
    }

    gotoEdit(categoriaRisco: CategoriaRisco = null) {
        if (categoriaRisco)
            this.router.navigate(['categoria-risco/edit', categoriaRisco.id]);
        else
            this.router.navigate(['categoria-risco/edit']);
    }

    gotoNewChild(categoriaRisco: CategoriaRisco) {
        this.router.navigate(['categoria-risco/edit', categoriaRisco.id]);
    }
}