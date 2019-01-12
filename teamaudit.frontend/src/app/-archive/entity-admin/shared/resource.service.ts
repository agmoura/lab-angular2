import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from "rxjs";

@Injectable()
export class ResourceService {

    public resource: string;
    public resourceId: string;
    public resourceData = [];
    public resourceRecord:any = {};

    public edit = new BehaviorSubject<string>(null);
    public load = new Subject();

    constructor() {

    }
}