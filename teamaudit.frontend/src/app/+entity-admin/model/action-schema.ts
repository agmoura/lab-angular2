import {Injectable, Injector, ReflectiveInjector, Type} from "@angular/core";
import {Router} from "@angular/router";
import {Observer} from "rxjs/Observer"
import {EntityBase} from "../../shared/model/models";

declare type Data = {
    [name: string]: any;
};

export interface ActionSchema<T> {
    label: string;
    icon: string;
    data?: Data;
    action: Type<BaseAction<T>>;
}

export abstract class BaseAction<T> {

    public static execute<T>(schema: ActionSchema<T>, context: Data, parent: Injector): Observer<T> {
        let injector = ReflectiveInjector.resolveAndCreate([schema.action], parent);
        let action: BaseAction<T> = injector.get(schema.action);
        Object.assign(action, schema.data);
        Object.assign(action, context);

        return action.isEnabled() ? action.execute() : null;
    }

    protected isEnabled(): boolean {
        return true;
    }

    protected abstract execute(): Observer<T>;
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

    public route: string;
    public entity: EntityBase;

    constructor(private router: Router) {
        super();
    }

    protected execute(): Observer<T> {
        this.router.navigate([this.route]);
        return null;
    }
}


