import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpModule, Http} from '@angular/http';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {AppComponent} from './app.component';
import {rootRoutesModule} from './app.routes';
import {DataService} from "./shared/services/data.service";
import {EntitySchemaService} from "./+entity-admin/entity-schema.service";
import {HomeComponent} from "./home/home.component";
import {ObjetivoEditComponent} from "./objetivo/objetivo-edit.component";
import {ObjetivoListComponent} from "./objetivo/objetivo-list.component";
import {CategoriaRiscoComponent} from "./categoria-risco/categoria-risco.component";
import {About} from "./about/about";
import {EntityAdminModule} from "./+entity-admin/entity-admin.module";

import {MasterDataModule} from "./+master-data/master-data.module";
import {ObjetivoDetailComponent} from "./objetivo/objetivo-detail.component";
import {CategoriaObjetivoEditComponent} from "./objetivo/categoria-objetivo-edit.component";
import {ObjetivoEditReactiveComponent} from "./objetivo/reactive/objetivo-edit-reactive.component";
import {CategoriaObjetivoEditReactiveComponent} from "./objetivo/reactive/categoria-objetivo-edit-reactive.component";


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        About,
        HomeComponent,
        CategoriaRiscoComponent,
        ObjetivoListComponent,
        ObjetivoEditComponent,
        ObjetivoDetailComponent,
        CategoriaObjetivoEditComponent,

        ObjetivoEditReactiveComponent,
        CategoriaObjetivoEditReactiveComponent

    ],
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
        rootRoutesModule,
        EntityAdminModule,
        MasterDataModule
    ],
    providers: [
        DataService,
        EntitySchemaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
