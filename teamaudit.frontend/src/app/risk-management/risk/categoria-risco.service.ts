import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Page, PagedList} from '../../shared/model/paged-list';
import {EntityBase} from '../../shared/model/models';

@Injectable()
export class CategoriaRiscoService {

    baseUrl: string = 'resources/';

    constructor(private http: HttpClient) {
    }

    public findAll(path: string,
                   page: Page = null,
                   sorts: string[] = null,
                   predicates: string[] = null,
                   projections: string[] = null): Observable<PagedList> {

        let url: string = this.baseUrl + path + '?';
        if (page) url += 'page=' + page.number + '&size=' + page.size;
        if (sorts) sorts.forEach(sort => url += '&sort=' + sort);
        if (predicates) predicates.forEach(predicate => url += '&predicates=' + predicate);
        if (projections) projections.forEach(projection => url += '&projections=' + projection);

        return this.http.get<any>(url).pipe(map(result =>
            new PagedList({page: result.page, list: result._embedded[path]})
        ));
    }

    public getByUri<T extends EntityBase>(uri: string): Observable<T> {
        return this.http.get<T>(uri);
    }

    public get<T extends EntityBase>(path: string, id: string): Observable<T> {
        return this.getByUri<T>(this.baseUrl + path + '/' + id);
    }

    public save<T extends EntityBase>(path: string, entity: T): Observable<T> {
        if (entity.id)
            return this.http.put<T>(this.baseUrl + path + '/' + entity.id, entity);

        return this.http.post<T>(this.baseUrl + path, entity);
    }

    public delete(path: string, id: string) {
        return this.http.delete(this.baseUrl + path + '/' + id);
    }
}