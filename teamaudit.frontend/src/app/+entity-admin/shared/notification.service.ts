import {Injectable} from '@angular/core';

@Injectable()
export class NotificationService {

    constructor() {
    }

    static showSuccess(message: string) {
        Snackbar.show({text: message})
    }

    static showError(message: string) {
        Snackbar.show({text: message})
    }
}