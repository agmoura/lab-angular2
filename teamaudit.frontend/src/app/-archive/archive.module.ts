import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormSampleModule} from './form-sample/form-sample.module';
import {EntityAdminSampleModule} from './entity-admin-sample/entity-admin-sample.module';

@NgModule({
    imports: [
        CommonModule,
        FormSampleModule,
        EntityAdminSampleModule
    ],
    declarations: [ ],
    providers: [ ],
})
export class ArchiveModule {
}
