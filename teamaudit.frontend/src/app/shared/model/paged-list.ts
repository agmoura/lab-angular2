export class PagedList {
    list:any[];
    page:Page;
    //links:Links;

    constructor(public result:any ) {
        this.list = result.list;
        this.page = result.page;
    }
}

export class Page {
    totalItens:number;
    totalPages:number;

    constructor(public number:number = 0, public size:number = 10) { }
}

/*
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
}*/
