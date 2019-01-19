import {Injectable} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({providedIn: 'root'})
export class NotificationService {

    constructor(private service: NzMessageService) { }

    public success(message: string) {
        this.service.success(message);
    }

    public error(message: string) {
        this.service.error(message);
    }
}