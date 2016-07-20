import {bootstrap} from '@angular/platform-browser-dynamic';
import {appRouterProviders} from './app/app.routes';
import {HTTP_PROVIDERS} from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {AppComponent} from './app/app.component';

// import {enableProdMode} from '@angular/core';
// enableProdMode();

bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]).catch(error => console.error(error));