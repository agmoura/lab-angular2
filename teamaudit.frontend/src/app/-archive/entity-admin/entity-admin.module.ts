import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";

import {TableDataComponent, TableFieldDirective} from './field/table-data';
import {SimpleFormComponent} from './field/simple-form';
import {SimpleFormReactiveComponent} from './field/simple-form-reactive';
import {EditViewComponent} from './field/edit-view';
import {ListViewComponent} from './field/list-view';
import {ReferenceManyToOneComponent} from './field/reference-many-one';
import {ReferenceOneToManyComponent} from './field/reference-one-many';
import {DataService} from '../../shared/services/data.service';
import {ResourceService} from './shared/resource.service';
import {BooleanFieldComponent} from './field/boolean-field';
import {TextFieldComponent} from './field/text-field';
import {BooleanInputComponent} from './input/boolean-input';
import {SelectInputComponent} from './input/select-input';
import {TextInputComponent} from './input/text-input';

const components = [
    TableDataComponent,
    TableFieldDirective,
    SimpleFormComponent,
    SimpleFormReactiveComponent,
    EditViewComponent,
    ListViewComponent,
    ReferenceManyToOneComponent,
    ReferenceOneToManyComponent,
    BooleanFieldComponent,
    TextFieldComponent,
    BooleanInputComponent,
    SelectInputComponent,
    TextInputComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule,
    ],
    declarations: [
        ...components
    ],
    providers: [
        ResourceService,
        DataService
    ],
    exports: [
        FormsModule,
        ...components
    ],
    entryComponents: [
        BooleanFieldComponent,
        TextFieldComponent,
    ]
})
export class EntityAdminModule {
}