import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {MaterialModule} from "@angular/material";
import {entityRouting} from "./entity.routes";
import {EntityListComponent} from "./entity-list.component";
import {EntityEditComponent} from "./entity-edit.component";
import {EntitySchemaService} from "./entity-schema.service";
import {HandleErrorsComponent} from "../shared/components/handle-errors.component";

//import {DataTableModule} from 'primeng/components/datatable/datatable';
//import {DxDataGridModule} from 'devextreme-angular';

import {TextInputComponent} from "./input/text-input";
import {ReferenceInputComponent} from "./input/reference-input";

//import {GridModule} from "@progress/kendo-angular-grid";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        entityRouting,
        //DataTableModule,
        //DxDataGridModule,
        //GridModule,
    ],
    declarations: [
        EntityListComponent,
        EntityEditComponent,
        ReferenceInputComponent,
        TextInputComponent,

        HandleErrorsComponent
    ],
    providers: [
        EntitySchemaService
    ]
})
export class EntityModule {
}