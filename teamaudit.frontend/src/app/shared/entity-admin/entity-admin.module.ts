import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {DxDataGridModule} from 'devextreme-angular/ui/data-grid';
import {DxDrawerModule} from 'devextreme-angular/ui/drawer';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxScrollViewModule} from 'devextreme-angular/ui/scroll-view';

import {entityAdminRouting} from "./entity-admin.routes";
import {ListComponent} from "./list/list.component";
import {EditComponent} from "./detail/edit.component";
import {DynamicFormComponent} from './detail/dynamic-form.component';
import {WrapperInputComponent} from "./input/wrapper-input";
import {TextInputComponent} from "./input/text-input";
import {SelectInputComponent} from "./input/select-input";
import {NumberInputComponent} from "./input/number-input";
import {DateInputComponent} from "./input/date-input";
import {GroupInputComponent} from "./input/group-input";
import {ReferenceManyComponent} from "./detail/reference-many.component";
import {BooleanInputComponent} from "./input/boolean-input";
import {DynamicFieldDirective} from "./input/dynamic-field.directive";
import {DxDatagridComponent} from "./list/dxdatagrid.component";
import {ActionService} from './model/actions';

const components = [
    SelectInputComponent,
    TextInputComponent,
    NumberInputComponent,
    DateInputComponent,
    BooleanInputComponent,
    GroupInputComponent
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule,
        entityAdminRouting,
        DxDataGridModule,
        DxDrawerModule,
        DxPopupModule,
        DxScrollViewModule
    ],
    declarations: [
        ListComponent,
        EditComponent,
        // DatagridComponent,
        DxDatagridComponent,
        ReferenceManyComponent,
        DynamicFormComponent,
        DynamicFieldDirective,
        WrapperInputComponent,
        ...components,
    ],
    providers: [
        ActionService
    ],
    exports: [
        ListComponent,
        EditComponent,
        // DatagridComponent,
        DxDatagridComponent,
        ReferenceManyComponent,
        DynamicFieldDirective,
        ...components,
    ],
    entryComponents: [
        ...components
    ]
})
export class EntityAdminModule {
}