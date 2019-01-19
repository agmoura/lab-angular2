import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import {entityAdminRouting} from './entity-admin.routes';
import {ListComponent} from './list/list.component';
import {EditComponent} from './detail/edit.component';
import {DynamicFormComponent} from './detail/dynamic-form.component';
import {WrapperInputComponent} from './input/wrapper-input';
import {TextInputComponent} from './input/text-input';
import {SelectInputComponent} from './input/select-input';
import {NumberInputComponent} from './input/number-input';
import {DateInputComponent} from './input/date-input';
import {GroupInputComponent} from './input/group-input';
import {ReferenceManyComponent} from './detail/reference-many.component';
import {BooleanInputComponent} from './input/boolean-input';
import {DynamicFieldDirective} from './input/dynamic-field.directive';
import {DynamicTableComponent} from './list/dynamic-table.component';
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
        NgZorroAntdModule
    ],
    declarations: [
        ListComponent,
        EditComponent,
        // DatagridComponent,
        DynamicTableComponent,
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
        DynamicTableComponent,
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