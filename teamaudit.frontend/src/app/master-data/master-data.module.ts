import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {MasterDataRoutingModule} from "./master-data-routing.module";
import {EntityAdminModule} from "../+entity-admin/entity-admin.module";
import {CategoriaObjetivoComponent} from "./objective/categoria-objetivo.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EntityAdminModule,
        MasterDataRoutingModule
    ],
    declarations: [
        CategoriaObjetivoComponent
    ],
    providers: [ ]
})
export class MasterDataModule {
}