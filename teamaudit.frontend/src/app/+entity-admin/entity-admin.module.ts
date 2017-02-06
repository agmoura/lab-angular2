import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {MaterialModule} from "@angular/material";
import {Md2Module} from 'md2/module';
import {TranslateModule} from 'ng2-translate';
import {entityAdminRouting} from "./entity-admin.routes";
import {ListComponent} from "./list/list.component";
import {EditComponent} from "./detail/edit.component";
import {EntitySchemaService} from "./entity-schema.service";
import {HandleErrorsComponent} from "../shared/components/handle-errors.component";

//import {DataTableModule} from 'primeng/components/datatable/datatable';
//import {DxDataGridModule} from 'devextreme-angular';

import {TextInputComponent} from "./input/text-input";
import {ReferenceInputComponent} from "./input/reference-input";
import {NumberInputComponent} from "./input/number-input";
import {DatagridComponent} from "./list/datagrid.component";
import {ReferenceManyComponent} from "./detail/referencemany.component";

//import {GridModule} from "@progress/kendo-angular-grid";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        Md2Module,
        TranslateModule,
        entityAdminRouting,
        //DataTableModule,
        //DxDataGridModule,
        //GridModule,
    ],
    declarations: [
        ListComponent,
        EditComponent,
        DatagridComponent,
        ReferenceManyComponent,
        ReferenceInputComponent,
        TextInputComponent,
        NumberInputComponent,

        HandleErrorsComponent
    ],
    providers: [
        EntitySchemaService
    ]
})
export class EntityAdminModule {
}