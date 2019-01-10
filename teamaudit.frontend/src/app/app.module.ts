import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpModule, Http} from '@angular/http';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from './app.component';
import {ExceptionModule} from "./shared/exception/exception-module";
import {DataService} from "./shared/services/data.service";
import {HomeComponent} from "./home/home.component";
import {About} from "./about/about";

import {ObjetivoEditComponent} from "./objetivo/objetivo-edit.component";
import {ObjetivoListComponent} from "./objetivo/objetivo-list.component";
import {ObjetivoDetailComponent} from "./objetivo/objetivo-detail.component";
import {CategoriaObjetivoEditComponent} from "./objetivo/categoria-objetivo-edit.component";
import {ObjetivoEditReactiveComponent} from "./objetivo/reactive/objetivo-edit-reactive.component";
import {CategoriaObjetivoEditReactiveComponent} from "./objetivo/reactive/categoria-objetivo-edit-reactive.component";
import {EntityAdminModule} from "./+entity-admin/entity-admin.module";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        TranslateModule.forRoot(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [HttpClient]
                }
            }
        ),
        AppRoutingModule,
        EntityAdminModule, // Force Eager Load Module
        ExceptionModule
    ],
    declarations: [
        AppComponent,
        About,
        HomeComponent,
        ObjetivoListComponent,
        ObjetivoEditComponent,
        ObjetivoDetailComponent,
        CategoriaObjetivoEditComponent,

        ObjetivoEditReactiveComponent,
        CategoriaObjetivoEditReactiveComponent
    ],

    providers: [
        DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
