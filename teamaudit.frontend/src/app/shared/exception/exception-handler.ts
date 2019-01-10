import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ExceptionService} from "./exception-service";
import {NotificationService} from "../services/notification.service";

interface WrappedError<T> { rejection: T; }

@Injectable()
export class ExceptionHandler implements ErrorHandler {
    constructor(private injector: Injector) {
    }

    handleError(error: Error | HttpErrorResponse | WrappedError<Error | HttpErrorResponse>) {
        if ('rejection' in error)
            error = error.rejection;

        return this.handle(< Error | HttpErrorResponse> error);
    }

    private handle(error: Error | HttpErrorResponse) {
        const zone = this.injector.get(NgZone);
        const exceptionService = this.injector.get(ExceptionService);
        const router = this.injector.get(Router);

        zone.run(() => {
            // Server Error
            if (error instanceof HttpErrorResponse) {

                // No Internet connection
                if (!navigator.onLine)
                    return NotificationService.error('No Internet Connection');

                if (error.status === 401)
                    return router.navigate(['/login']);

                if (error.status === 403)
                    return router.navigate(['/forbiden']);

                // Show notification to the user
                return NotificationService.error(this.getMessage(error));
            }

            // Client Error
            else {
                return exceptionService.log(error).subscribe(
                    e => router.navigate(['/error'], {queryParams: {id: e.id, detail: e.message + ' - ' + e.detail}}),
                    e => router.navigate(['/error'], {queryParams: {detail: this.getMessage(e)}}),
                );
            }
        });

        return false;
    }

    private getMessage(response: HttpErrorResponse) {
        if (response.error && response.error.errors && response.error.errors.length > 0)
            return response.error.errors
                .map(e => (e.field ? e.field + ' - ' : '') + e.defaultMessage)
                .join('<br/>');

        return `${response.status} - ${response.message}`;
    }
}

