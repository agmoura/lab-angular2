import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";

import {PagedList, Page} from "../model/paged-list";
import {EntityBase} from "../model/models";
import {ResourceQuery} from "../model/query";

@Injectable()
export class DataService {

    //baseUrl: string = 'http://localhost:8080/teamaudit/api/';
    baseUrl: string = 'api/';

    constructor(private http: Http) {
    }

    findAll(path: string,
            page: Page = null,
            sorts: string[] = null,
            predicates: string[] = null,
            projections: string[] = null): Observable<PagedList> {

        let url: string = this.baseUrl + path + '?';

        if (page) url += 'page.number=' + page.number + '&page.size=' + page.size;

        if (sorts) sorts.forEach(sort => url += '&sorts=' + sort);

        if (predicates) predicates.forEach(predicate => url += '&predicates=' + predicate);

        if (projections) projections.forEach(projection => url += '&projections=' + projection);

        return this.http.get(url).map(response => new PagedList(response.json()));
    }


    find(resourceQuery: ResourceQuery): Observable<PagedList> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let url: string = this.baseUrl + resourceQuery.entityPath + '/query';

        return this.http.post(url, resourceQuery, {headers: headers})
            .map(response => new PagedList(response.json()));
    }

    getByUri<TEntity extends EntityBase>(uri: string): Observable<TEntity> {
        return <Observable<TEntity>> this.http.get(uri)
            .map(response => response.json());
    }

    get<TEntity extends EntityBase>(path: string, id: string): Observable<TEntity> {
        return this.getByUri<TEntity>(this.baseUrl + path + '/' + id);
    }

    save<TEntity extends EntityBase>(path: string, entity: TEntity): Observable<TEntity> {
        let headers = new Headers({'Content-Type': 'application/json'});

        if (entity.id)
            return <Observable<TEntity>> this.http.put(this.baseUrl + path + "/" + entity.id, JSON.stringify(entity), {headers: headers})
                .map(response => <TEntity> response.json());

        return <Observable<TEntity>> this.http.post(this.baseUrl + path, JSON.stringify(entity), {headers: headers})
            .map(response => response.json());
    }

    patch<TEntity extends EntityBase>(path: string, entity: TEntity): Observable<TEntity> {
        let headers = new Headers({'Content-Type': 'application/json'});

        return <Observable<TEntity>> this.http.patch(this.baseUrl + path + "/" + entity.id, JSON.stringify(entity), {headers: headers})
            .map(response => <TEntity> response.json());
    }

    delete(path: string, id: string) {
        return this.http.delete(this.baseUrl + path + "/" + id);
    }

    //TODO: Remover código de teste
    executeAction<TEntity extends EntityBase>(path: string): Observable<TEntity> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let url = this.baseUrl + path + '/execute';

        /*let data = {
         id: '1',
         action: 'save',
         number: 100
         };*/

        let data = new URLSearchParams();
        data.append('id', '1');
        data.append('action', 'save');
        data.append('number', '100');

        return <Observable<TEntity>> this.http.post(url, data.toString(), {headers: headers})
            .map(response => response.json());
    }
}