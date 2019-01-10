export class PagedList {
    list:any[];
    page:Page;

    constructor(public pagedList:any) {
        this.list = pagedList.list;
        this.page = new Page(pagedList.page);
    }
}

export class Page {
    number:number = 0;
    size:number = 10;
    totalItens:number = 0;
    totalPages:number = 0;

    constructor(page:any = null) {
        if (page) {
            this.number = page.number;
            this.size = page.size;
            this.totalItens = page.totalItens;
            this.calculeteTotalPages();
        }
    }

    private calculeteTotalPages():void {
        if (this.size >= 0)
            this.totalPages = Math.ceil(this.totalItens / this.size);
    }
}   