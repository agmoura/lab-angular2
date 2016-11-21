import {Page} from "./paged-list";

export class EntityQuery {

    projections: string[] = [];
    predicates: any;
    sorts: string[] = [];
    page: Page;

    constructor(public entityPath: string) {

    }

    select(projection: string): EntityQuery {
        this.projections.push(projection);
        return this;
    }

    selectList(projections: string[]): EntityQuery {
        this.projections = this.projections.concat(projections);
        return this;
    }

    where(predicate: any): EntityQuery {
        if (predicate)
            this.predicates = Object.assign(this.predicates || {}, predicate);
        return this;
    }

    removeWhere(predicate: any): void {
        if(this.predicates) {
            for (var attribute in predicate) {
                if (this.predicates[attribute]) {
                    delete this.predicates[attribute];
                }
            }
        }
    }

    orderBy(sort: string): EntityQuery {
        this.sorts.push(sort);
        return this;
    }

    orderByList(sorts: string[]): EntityQuery {
        if (sorts)
            this.sorts = this.sorts.concat(sorts);
        return this;
    }

    pageItem(page: Page): EntityQuery {
        this.page = page;
        return this;
    }


}