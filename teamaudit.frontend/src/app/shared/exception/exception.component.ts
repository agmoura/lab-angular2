import {Component, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-error',
    template: `
        <div class="background">
            <div class="block">
                <h1 [title]="error.detail">{{error.title}}</h1>
                <h2 [title]="error.detail">{{error.message | translate}}</h2>
                <h3 *ngIf="error.id">(ID: <a [routerLink]="['/masterdata/log/logExcecao', error.id]">{{error.id}})</a></h3>

                <div class="links">
                    <a class="button" (click)="goBack()" [title]="'GOBACK' | translate"><i class="zmdi zmdi-arrow-back"></i></a>
                    <a class="button" routerLink="" [title]="'HOME' | translate"><i class="zmdi zmdi-home"></i></a>
                    <!--<a class="button" routerLink="/about" [title]="'ABOUT' | translate"><i class="zmdi zmdi-help-outline"></i></a>-->
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./exception.component.less']
})
export class ExceptionComponent implements OnDestroy {
    public error: ErrorType;
    private routeSubscription: any;
    private messages = {
        'OPS!': 'UNEXPECTED.EXCEPTION',
        403: 'Acesso Não Permitido!',
        404: 'Página Não Encontrada!'
    };

    constructor(private route: ActivatedRoute, private location: Location) {
        this.routeSubscription = this.route.queryParams.subscribe(params => {
            this.error = {...params, ...this.route.snapshot.data};
            this.error.title = this.error.title || 'OPS!';
            this.error.message = this.messages[this.error.title];
            this.error.detail = this.error.detail || this.error.message;
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    public goBack() {
        this.location.back();
    }
}

interface ErrorType {
    id?: string;
    title?: string;
    message?: string;
    detail?: string;
}
