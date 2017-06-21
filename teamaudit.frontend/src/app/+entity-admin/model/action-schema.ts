import {Injectable, ReflectiveInjector} from "@angular/core";
import {Router} from "@angular/router";
import {Observer} from "rxjs/Observer"


export interface ActionSchema<T> {
    label: string;
    icon: string;
    execute(context: any): Observer<T>;
}

export class DataServiceAction<T> implements ActionSchema<T> {

    constructor(public label: string, public icon: string) {

    }

    execute(context: any): Observer<T> {
        return undefined;
    }
}

export class RouteAction<T> implements ActionSchema<T> {

    private router: Router;

    constructor(public label: string, public icon: string, private route: string) {
        //let injector = ReflectiveInjector.resolveAndCreate([ROUTER_PROVIDERS]);
        //this.router = injector.get(Router);
    }

    execute(context: any): Observer<T> {
        this.router.navigate([this.route]);

        return null;
    }
}

@Injectable()
class RouteActionCore {

    public router: string;

    constructor() {

    }
}

