import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {masterDataRouting} from "./master-data.routes";
import {EntityAdminModule} from "../+entity-admin/entity-admin.module";
import {CategoriaObjetivoComponent} from "./categoria-objetivo.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,

        EntityAdminModule,
        masterDataRouting
    ],
    declarations: [
        CategoriaObjetivoComponent
    ],
    providers: [ ]
})
export class MasterDataModule {
}