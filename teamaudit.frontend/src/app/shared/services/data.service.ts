import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/operator/map';
import {Http, Headers} from "@angular/http";

import {PagedList, Page} from "../model/paged-list";
import {EntityBase} from "../model/models";

@Injectable()
export class DataService {

    baseUrl:string = 'http://localhost:8080/teamaudit/api/';

    constructor(private http:Http) { }

    findAll<TEntity extends EntityBase>(path:string, page:Page = new Page(0, -1)):Observable<PagedList<TEntity>> {
        return this.http.get(this.baseUrl + path + '?page=' + page.number + '&size=' + page.size)
            .map(response => new PagedList<TEntity>(response.json(), path));
    }

    get<TEntity extends EntityBase>(path:string, id:string):Observable<TEntity> {
        return <Observable<TEntity>> this.http.get(this.baseUrl + path + '/' + id)
            .map(response => response.json());
    }

    save<TEntity extends EntityBase>(path:string, entity:TEntity):Observable<TEntity> {
        let headers = new Headers({'Content-Type': 'application/json'});

        if (entity.id)
            return <Observable<TEntity>> this.http.put(entity._links.self.href, JSON.stringify(entity), {headers: headers})
                .map(response => <TEntity> response.json());

        return <Observable<TEntity>> this.http.post(this.baseUrl + path, JSON.stringify(entity), {headers: headers})
            .map(response => response.json());
    }

    delete<TEntity extends EntityBase>(entity:TEntity) {
        return this.http.delete(entity._links.self.href);
    }
}
