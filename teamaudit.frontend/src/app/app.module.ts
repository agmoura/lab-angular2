import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from '@angular/flex-layout';
import {Md2Module} from 'md2/module';
import {TranslateStaticLoader, TranslateLoader, TranslateModule} from 'ng2-translate';

import {AppComponent} from './app.component';
import {rootRoutesModule} from './app.routes';

import {AppService} from "./app.service";
import {DataService} from "./shared/services/data.service";
import {EntitySchemaService} from "./+entity-admin/entity-schema.service";
import {HomeComponent} from "./home/home.component";
import {ObjetivoEditComponent} from "./objetivo/objetivo-edit.component";
import {ObjetivoListComponent} from "./objetivo/objetivo-list.component";
import {CategoriaRiscoComponent} from "./categoria-risco/categoria-risco.component";
import {About} from "./about/about";
import {EntityAdminModule} from "./+entity-admin/entity-admin.module";

import {DialogExampleComponent} from "./shared/dialog/dialog-example/dialog-example.component";
import {DialogThemeComponent} from "./shared/dialog/dialog-theme/dialog-theme.component";
import {MasterDataModule} from "./+master-data/master-data.module";

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
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,

        MaterialModule.forRoot(),
        FlexLayoutModule.forRoot(),
        Md2Module.forRoot(),
        TranslateModule.forRoot({provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [Http]}),

        rootRoutesModule,
        EntityAdminModule,
        MasterDataModule
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
