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

import {TextInputComponent} from "./input/text-input";
import {SelectInputComponent} from "./input/select-input";
import {NumberInputComponent} from "./input/number-input";
import {DatagridComponent} from "./list/datagrid.component";
import {DateInputComponent} from "./input/date-input";
import {ReferenceManyComponent} from "./detail/reference-many.component";
import {BooleanInputComponent} from "./input/boolean-input";
import {TextFieldComponent} from "./field/text-field";
import {BooleanFieldComponent} from "./field/boolean-field";
import {TableDataComponent, TableFieldDirective} from "./field/table-data";
import {SimpleFormComponent} from "./field/simple-form";
import {SimpleFormReactiveComponent} from "./field/simple-form-reactive";
import {EditViewComponent} from "./field/edit-view";
import {ListViewComponent} from "./field/list-view";
import {ResourceService} from "./shared/resource.service";
import {ReferenceManyToOneComponent} from "./field/reference-many-one";
import {ReferenceOneToManyComponent} from "./field/reference-one-many";
import {DynamicFieldDirective} from "./field/dynamic-field.directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        Md2Module,
        TranslateModule,
        entityAdminRouting
    ],
    declarations: [
        ListComponent,
        EditComponent,
        DatagridComponent,

        ReferenceManyComponent,

        DynamicFieldDirective,
        SelectInputComponent,
        TextInputComponent,
        NumberInputComponent,
        DateInputComponent,
        BooleanInputComponent,
        TextFieldComponent,
        BooleanFieldComponent,

        TableDataComponent,
        TableFieldDirective,
        SimpleFormComponent,
        SimpleFormReactiveComponent,
        EditViewComponent,
        ListViewComponent,
        ReferenceManyToOneComponent,
        ReferenceOneToManyComponent
    ],
    providers: [
        EntitySchemaService,
        ResourceService
    ],
    exports: [
        ListComponent,
        EditComponent,
        DatagridComponent,

        ReferenceManyComponent,

        DynamicFieldDirective,
        SelectInputComponent,
        TextInputComponent,
        NumberInputComponent,
        DateInputComponent,
        BooleanInputComponent,
        TextFieldComponent,
        BooleanFieldComponent,

        TableDataComponent,
        TableFieldDirective,
        SimpleFormComponent,
        SimpleFormReactiveComponent,
        EditViewComponent,
        ListViewComponent,
        ReferenceManyToOneComponent,
        ReferenceOneToManyComponent
    ],
    entryComponents: [
        TextFieldComponent,
        BooleanFieldComponent,
        SelectInputComponent,
        TextInputComponent,
        NumberInputComponent,
        DateInputComponent,
        BooleanInputComponent
    ]
})
export class EntityAdminModule {
}