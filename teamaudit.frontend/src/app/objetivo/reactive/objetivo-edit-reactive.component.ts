import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {Objetivo, CategoriaObjetivo, UnidadeOrganizacional} from "../../shared/model/models";
import {DataService} from "../../shared/services/data.service";
import {FormBuilder, FormGroup, Validator} from "@angular/forms";

@Component({
    selector: 'objetivo-edit-reactive',
    templateUrl: './objetivo-edit-reactive.component.html'
})
export class ObjetivoEditReactiveComponent implements OnInit {

    form: FormGroup;
    objetivo: Objetivo = <Objetivo>{};
    categorias: CategoriaObjetivo[] = [];
    unidades: UnidadeOrganizacional[] = [];
    errors: any;

    constructor(private builder: FormBuilder, private route: ActivatedRoute, private router: Router, private dataService: DataService) {
        this.form = builder.group({
            id: [''],
            nome: [''],
            descricao: [''],
            descricaoMeta: [''],
            valorMeta: [0],
            percentualMeta: [1],
            categoriaObjetivo2: [''],
            categoriaObjetivo: builder.group({id:''}),
            unidadeOrganizacional:builder.group({id:''})







        });
    }

    ngOnInit() {
        this.load(this.route.snapshot.params['id'])
    }

    load(id: string) {
        if (id)
            this.dataService.get<Objetivo>('objetivo', id).subscribe(
                data => this.form.patchValue(data)
            );

        this.dataService.findAll('categoriaObjetivo').subscribe(
            data => this.categorias = data.list
        );

        this.dataService.findAll('unidadeOrganizacional').subscribe(
            data => this.unidades = data.list
        );
    }

    save(objetivo: Objetivo) {

        this.dataService.save('objetivo', objetivo).subscribe(
            data => this.objetivo = data,
            error => this.errors = error,
            () => this.goBack()
        );
    }

    goBack() {
        this.router.navigate(['/objetivo']);
    }
}
