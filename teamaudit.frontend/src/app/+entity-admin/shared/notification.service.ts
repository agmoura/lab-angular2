import {Injectable} from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable()
export class NotificationService {

    constructor() {
    }

    static showSuccess(message: string) {
        notify(message, 'success');
    }

    static showError(message: string) {
        notify(message, 'error');
    }
}