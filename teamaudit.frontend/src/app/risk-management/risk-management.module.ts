import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from '@angular/flex-layout';
import {Md2Module} from 'md2/module';
import {TranslateModule} from 'ng2-translate';
import {EntityAdminModule} from "../+entity-admin/entity-admin.module";
import {RiskManagementRoutingModule} from "./risk-management-routing.module";

@NgModule({
    imports: [
        CommonModule,
        EntityAdminModule,
        RiskManagementRoutingModule
    ],
    declarations: [ ],
    providers: [ ]
})
export class RiskManagementModule {
}