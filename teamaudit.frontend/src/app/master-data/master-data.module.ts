import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {MasterDataRoutingModule} from "./master-data-routing.module";
import {EntityAdminModule} from "../shared/entity-admin/entity-admin.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EntityAdminModule,
        MasterDataRoutingModule
    ],
    declarations: [ ],
    providers: [ ]
})
export class MasterDataModule {

}