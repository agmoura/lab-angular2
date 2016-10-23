import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {rootRoutesModule} from './app.routes';

import {DataService} from "./shared/services/data.service";
import {EntitySchemaService} from "./+entity/entity-schema.service";
import {HandleErrorsComponent} from "./shared/components/handle-errors.component";
import {HomeComponent} from "./home/home.component";
import {ObjetivoEditComponent} from "./objetivo/objetivo-edit.component";
import {ObjetivoListComponent} from "./objetivo/objetivo-list.component";
import {CategoriaRiscoComponent} from "./categoria-risco/categoria-risco.component";
import {EntityEditComponent} from "./+entity/entity-edit.component";
import {EntityListComponent} from "./+entity/entity-list.component";
import {About} from "./about/about";


@NgModule({
    declarations: [
        AppComponent,
        HandleErrorsComponent,
        About,
        HomeComponent,
        EntityListComponent,
        EntityEditComponent,
        CategoriaRiscoComponent,
        ObjetivoListComponent,
        ObjetivoEditComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        rootRoutesModule
    ],
    providers: [DataService, EntitySchemaService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
