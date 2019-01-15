import {Injectable, Injector, Type} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {Observable, EMPTY} from 'rxjs';

declare type Data = {
    [name: string]: any;
};

export interface IAction<T> {
    label: string;
    icon: string;
    data?: Data;
    action: Type<BaseAction<T>>;
}

@Injectable()
export class ActionService<T> {

    constructor(private injector: Injector) { }

    public getActions(actionSchemas: IAction<T>[], context: Data): BaseAction<T>[] {
        if (!actionSchemas) return [];

        return actionSchemas.map(schema => {
            let action: BaseAction<T> = this.injector.get(schema.action); // Prototype Scope
            action.label = schema.label;
            action.icon = schema.icon;
            Object.assign(action, schema.data);
            Object.assign(action, context);
            return action;
        });
    }
}

export abstract class BaseAction<T> {
    public label: string;
    public icon: string;

    public isEnabled(): boolean {
        return true;
    }

    public abstract execute(): Observable<T>;
}

/*export class DataServiceAction<T> extends Actions<T> {

 constructor(public label: string, public icon: string) {

 }

 execute(context: any): Observer<T> {
 return undefined;
 }
 }*/

@Injectable({providedIn: 'root'})
export class RouteAction<T> extends BaseAction<T> {
    public form: FormGroup;
    public route: string;

    constructor(private router: Router) {
        super();
    }

    public execute(): Observable<T> {
        this.router.navigate([this.route]);
        return EMPTY;
    }
}


