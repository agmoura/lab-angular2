import {Injectable} from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable()
export class NotificationService {

    constructor() {
    }

    static success(message: string) {
        notify(message, 'success');
    }

    static error(message: string) {
        notify(message, 'error');
    }
}