import {NgModule, ErrorHandler} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ExceptionRoutingModule} from "./exception-routing.module";
import {ExceptionComponent} from "./exception.component";
import {ExceptionHandler} from "./exception-handler";
import {ExceptionService} from "./exception-service";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        TranslateModule.forChild(),
        ExceptionRoutingModule,
    ],
    declarations: [
        ExceptionComponent
    ],
    providers: [
        ExceptionService,
        {provide: ErrorHandler, useClass: ExceptionHandler},
    ]
})
export class ExceptionModule {

}
