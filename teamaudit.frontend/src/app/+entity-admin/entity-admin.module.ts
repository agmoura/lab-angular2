import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from '@angular/flex-layout';
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
import {DateInputComponent} from "./input/date-input";
import {ReferenceManyComponent} from "./detail/reference-many.component";
import {BooleanInputComponent} from "./input/boolean-input";
import {TextFieldComponent} from "./field/text-field";
import {BooleanFieldComponent} from "./field/boolean-field";
import {TableDataComponent, TableFieldDirective} from "./field/table-data";
import {SimpleFormComponent} from "./field/simple-form";

//import {GridModule} from "@progress/kendo-angular-grid";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
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
        DateInputComponent,
        BooleanInputComponent,

        TextFieldComponent,
        BooleanFieldComponent,
        TableDataComponent,
        TableFieldDirective,
        SimpleFormComponent
    ],
    providers: [
        EntitySchemaService
    ],
    exports: [
        ListComponent,
        EditComponent,
        DatagridComponent,

        ReferenceManyComponent,

        ReferenceInputComponent,
        TextInputComponent,
        NumberInputComponent,
        DateInputComponent,
        BooleanInputComponent,

        TextFieldComponent,
        BooleanFieldComponent,
        TableDataComponent,
        //TableFieldDirective,

        SimpleFormComponent
    ],
    entryComponents: [
        TextFieldComponent,
        BooleanFieldComponent
    ]
})
export class EntityAdminModule {
}