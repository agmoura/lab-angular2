import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Objetivo, CategoriaObjetivo, UnidadeOrganizacional, EntityBase} from "../shared/model/models";
import {DataService} from "../shared/services/data.service";

@Component({
    selector: 'objetivo-edit',
    templateUrl: './objetivo-edit.component.html',
    //styleUrls: ['./app.css'],
    moduleId: module.id,
    providers: [DataService],
})
export class ObjetivoEditComponent implements OnInit {

    objetivo:Objetivo = new Objetivo();
    categorias:CategoriaObjetivo[] = [];
    unidades:UnidadeOrganizacional[] = [];
    errors:string[] = [];

    constructor(private route:ActivatedRoute, private router:Router, private dataService:DataService) {
        //this.objetivo.categoriaObjetivo = new CategoriaObjetivo();
        //this.objetivo.unidadeOrganizacional = new UnidadeOrganizacional();
        //this.objetivo.categoriaObjetivo.id = "XXXXX";
    }

    ngOnInit() {
        this.load(this.route.snapshot.params['id'])
    }

    load(id:string) {
        if (id)
            this.dataService.get<Objetivo>('objetivo', id).subscribe(
                data => this.objetivo = data
            );

        this.dataService.findAll('categoriaObjetivo').subscribe(
            data => this.categorias = data.list
        );

        this.dataService.findAll('unidadeOrganizacional').subscribe(
            data => this.unidades = data.list
        );
    }

    save(objetivo:Objetivo) {

        this.dataService.save('objetivo', objetivo).subscribe(
            data => this.objetivo = data,
            error => this.handleError(error.json()),
            () => this.goBack()
        );
    }

    goBack() {
        this.router.navigate(['/objetivo']);
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
