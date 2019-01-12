import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedList, Page} from "../model/paged-list";
import {EntityBase} from "../model/models";
import {ResourceQuery} from "../model/query";

@Injectable({providedIn: 'root'})
export class DataService {

    //baseUrl: string = 'http://localhost:8080/teamaudit/api/';
    baseUrl: string = 'api/';

    constructor(private http: HttpClient) {
    }

    public findAll(path: string,
            page: Page = null,
            sorts: string[] = null,
            predicates: string[] = null,
            projections: string[] = null): Observable<PagedList> {

        let url: string = this.baseUrl + path + '?';

        if (page) url += 'page.number=' + page.number + '&page.size=' + page.size;
        if (sorts) sorts.forEach(sort => url += '&sorts=' + sort);
        if (predicates) predicates.forEach(predicate => url += '&predicates=' + predicate);
        if (projections) projections.forEach(projection => url += '&projections=' + projection);

        return this.http.get<PagedList>(url);
    }


    public find(resourceQuery: ResourceQuery): Observable<PagedList> {
        let url: string = this.baseUrl + resourceQuery.entityPath + '/query';
        return this.http.post<PagedList>(url, resourceQuery);
    }

    public getByUri<T extends EntityBase>(uri: string): Observable<T> {
        return this.http.get<T>(uri);
    }

    public get<T extends EntityBase>(path: string, id: string): Observable<T> {
        return this.getByUri<T>(this.baseUrl + path + '/' + id);
    }

    public save<T extends EntityBase>(path: string, entity: T): Observable<T> {
        if (entity.id)
            return this.http.put<T>(this.baseUrl + path + "/" + entity.id, entity);

        return this.http.post<T>(this.baseUrl + path, entity);
    }

    public patch<T extends EntityBase>(path: string, entity: T): Observable<T> {
        return this.http.patch<T>(this.baseUrl + path + "/" + entity.id, entity);
    }

    public delete(path: string, id: string) {
        return this.http.delete(this.baseUrl + path + "/" + id);
    }

    //TODO: Remover código de teste
    public executeAction<T extends EntityBase>(path: string): Observable<T> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let url = this.baseUrl + path + '/execute';

        /*let data = {
         id: '1',
         action: 'save',
         number: 100
         };*/

        let data = new HttpParams();
        data.append('id', '1');
        data.append('action', 'save');
        data.append('number', '100');

        return this.http.post<T>(url, null, {params: data});
    }
}