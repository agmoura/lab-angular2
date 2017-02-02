import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {MaterialModule} from "@angular/material";
import {Md2Module} from 'md2/module';
import {TranslateStaticLoader, TranslateLoader, TranslateModule} from 'ng2-translate';

import {AppComponent} from './app.component';
import {rootRoutesModule} from './app.routes';

import {AppService} from "./app.service";
import {DataService} from "./shared/services/data.service";
import {EntitySchemaService} from "./+entity/entity-schema.service";
import {HomeComponent} from "./home/home.component";
import {ObjetivoEditComponent} from "./objetivo/objetivo-edit.component";
import {ObjetivoListComponent} from "./objetivo/objetivo-list.component";
import {CategoriaRiscoComponent} from "./categoria-risco/categoria-risco.component";
import {About} from "./about/about";
import {EntityModule} from "./+entity/entity.module";

import {DialogExampleComponent} from "./shared/dialog/dialog-example/dialog-example.component";
import {DialogThemeComponent} from "./shared/dialog/dialog-theme/dialog-theme.component";

@NgModule({
    declarations: [
        AppComponent,
        About,
        HomeComponent,
        CategoriaRiscoComponent,
        ObjetivoListComponent,
        ObjetivoEditComponent,

        DialogExampleComponent,
        DialogThemeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,

        MaterialModule.forRoot(),
        Md2Module.forRoot(),
        TranslateModule.forRoot({provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [Http]}),

        rootRoutesModule,
        EntityModule
    ],
    providers: [
        AppService,
        DataService,
        EntitySchemaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
