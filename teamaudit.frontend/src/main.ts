import {bootstrap} from '@angular/platform-browser-dynamic';
import {Type} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {appRouterProviders} from './app/app.routes';
import {AppComponent} from './app/app.component';

//var country = require('./data/countries.json');

bootstrap(<Type> AppComponent, [
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    appRouterProviders
]).catch(error => console.error(error));