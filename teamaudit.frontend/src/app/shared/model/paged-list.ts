export class PagedList<TEntity> {
    page:Page;
    links:Links;
    list:TEntity[];

    constructor(data:any, listName:string) {
        this.page = data.page;
        this.links = data._links;
        this.list = data._embedded[listName];
    }
}

export class Page {
    totalElements:number;
    totalPages:number;

    constructor(public number:number = 0, public size:number = 10) { }
}

export class Link {
    href:string;
    templated:boolean;
}

export class Links {
    first:Link;
    self:Link;
    next:Link;
    last:Link;
    profile:Link;
    search:Link;
}