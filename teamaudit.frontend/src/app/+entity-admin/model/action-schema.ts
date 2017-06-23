import {Injectable, Injector, ReflectiveInjector, Type} from "@angular/core";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs/Observable";

declare type Data = {
    [name: string]: any;
};

export interface ActionSchema<T> {
    label: string;
    icon: string;
    data?: Data;
    action: Type<BaseAction<T>>;
}

@Injectable()
export class ActionService<T> {

    private actions: BaseAction<T>[] = [];

    constructor(private injector: Injector) {
    }

    public setup(actionSchemas: ActionSchema<T>[], context: Data): void {

        if (actionSchemas) {
            const injector = ReflectiveInjector.fromResolvedProviders([], this.injector);

            this.actions = actionSchemas.map(schema => {
                let action: BaseAction<T> = injector.resolveAndInstantiate(schema.action); // Prototype Scope
                action.label = schema.label;
                action.icon = schema.icon;
                Object.assign(action, schema.data);
                Object.assign(action, context);
                return action
            });
        }
    }

    public getActions(): BaseAction<T>[] {
        return this.actions;
    }

    public getEnabledActions(): BaseAction<T>[] {
        return this.actions.filter(action => action.isEnabled());
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

/*export class DataServiceAction<T> extends ActionSchema<T> {

 constructor(public label: string, public icon: string) {

 }

 execute(context: any): Observer<T> {
 return undefined;
 }
 }*/

@Injectable()
export class RouteAction<T> extends BaseAction<T> {
    public form: FormGroup;
    public route: string;

    constructor(private router: Router) {
        super();
    }

    public execute(): Observable<T> {
        this.router.navigate([this.route]);
        return Observable.empty();
    }
}


