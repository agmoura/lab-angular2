import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {formSampleRoutes} from './form-sample.routes';
import {ObjetivoListComponent} from './objetivo-list.component';
import {ObjetivoEditComponent} from './objetivo-edit.component';
import {ObjetivoDetailComponent} from './objetivo-detail.component';
import {CategoriaObjetivoEditComponent} from './categoria-objetivo-edit.component';
import {ObjetivoEditReactiveComponent} from './reactive/objetivo-edit-reactive.component';
import {CategoriaObjetivoEditReactiveComponent} from './reactive/categoria-objetivo-edit-reactive.component';
import {DataService} from '../../shared/services/data.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(formSampleRoutes)
    ],
    declarations: [
        ObjetivoListComponent,
        ObjetivoEditComponent,
        ObjetivoDetailComponent,
        CategoriaObjetivoEditComponent,
        ObjetivoEditReactiveComponent,
        CategoriaObjetivoEditReactiveComponent
    ],
    providers: [
        DataService
    ],
})
export class FormSampleModule {
}
