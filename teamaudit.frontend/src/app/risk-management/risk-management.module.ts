import {NgModule} from '@angular/core';
import {CommonModule}   from '@angular/common';
import {EntityAdminModule} from "../+entity-admin/entity-admin.module";
import {RiskManagementRoutingModule} from "./risk-management-routing.module";
import {RiskModule} from './risk/risk.module';

@NgModule({
    imports: [
        CommonModule,
        EntityAdminModule,
        RiskManagementRoutingModule,
        RiskModule
    ],
    declarations: [ ],
    providers: [ ]
})
export class RiskManagementModule {
}