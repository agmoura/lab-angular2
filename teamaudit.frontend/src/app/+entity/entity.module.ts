import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {entityRouting} from "./entity.routes";
import {EntityListComponent} from "./entity-list.component";
import {EntityEditComponent} from "./entity-edit.component";
import {EntitySchemaService} from "./entity-schema.service";
import {HandleErrorsComponent} from "../shared/components/handle-errors.component";

//import {DataTableModule} from 'primeng/components/datatable/datatable';
import {DevExtremeModule} from 'devextreme-angular'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        entityRouting,
        //DataTableModule,
        DevExtremeModule
    ],
    declarations: [
        EntityListComponent,
        EntityEditComponent,
        HandleErrorsComponent
    ],
    providers: [
        EntitySchemaService
    ]
})
export class EntityModule {
}