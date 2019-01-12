import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from '@angular/router';
import {EntityAdminModule} from '../entity-admin/entity-admin.module';
import {CategoriaObjetivoComponent} from './categoria-objetivo.component';
import {entityAdminSampleRoutes} from './entity-admin-sample.routes';

@NgModule({
    imports: [
        CommonModule,
        EntityAdminModule,
        RouterModule.forChild(entityAdminSampleRoutes)
    ],
    declarations: [
        CategoriaObjetivoComponent,
    ],
    providers: [ ]
})
export class EntityAdminSampleModule {

}
