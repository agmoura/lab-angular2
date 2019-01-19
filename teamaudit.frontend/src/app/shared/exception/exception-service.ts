import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable()
export class ExceptionService {

    constructor(private http: HttpClient, private router: Router) { }

    log(error: Error): Observable<Exception> {
        console.error(error);
        const exception: Exception = {
            message: error.message,
            detail: error.stack,
            url: this.router.url
        };

        return of(exception);
    }
}

interface Exception {
    id?: string;
    message: string;
    detail: string;
    url: string;
}
