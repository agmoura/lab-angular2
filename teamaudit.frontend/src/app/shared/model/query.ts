import {Page} from "./paged-list";

export class ResourceQuery {

    projections: string[] = [];
    predicates: any;
    sorts: string[] = [];
    page: Page;

    constructor(public entityPath: string) {

    }

    select(projection: string): ResourceQuery {
        this.projections.push(projection);
        return this;
    }

    selectList(projections: string[]): ResourceQuery {
        this.projections = this.projections.concat(projections);
        return this;
    }

    where(predicate: any): ResourceQuery {
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

    orderBy(sort: string): ResourceQuery {
        this.sorts.push(sort);
        return this;
    }

    orderByList(sorts: string[]): ResourceQuery {
        if (sorts)
            this.sorts = this.sorts.concat(sorts);
        return this;
    }

    pageItem(page: Page): ResourceQuery {
        this.page = page;
        return this;
    }


}