import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IDataSource} from '../model/schema';
import {EntityBase, PagedList, ResourceQuery} from '../../model';

export class ReferenceDataSource implements IDataSource<EntityBase> {
    public valueField: string | number;
    public textField: string | number;
    private query: ResourceQuery;

    constructor(
        resource: string,
        valueField: string = 'id',
        textField: string = 'nome',
        filter: any = null,
        orders: any[] = null) {

        this.valueField = 0;
        this.textField = 1;
        this.query = new ResourceQuery(resource)
            .select(valueField)
            .select(textField)
            .where(filter)
            .orderByList(orders || [textField]);
    }

    compare(item1: EntityBase, item2: EntityBase): boolean {
        return item1 && item2 ? item1[0] === item2[0] : item1 === item2;
    }

    execute(http: HttpClient): Observable<EntityBase[]> {
        return http.post<PagedList>(`api/${this.query.entityPath}/query`, this.query)
            .pipe( map(data => data.list));
    }

    /*execute(): Observable<EntityBase> {
        return var resourceQuery = new ResourceQuery(field.referencePath || field.source)
            .select(field.select.value)
            .select(field.select.text)
            .orderBy(field.select.text);

        return this.dataService.find(resourceQuery).subscribe(
            data => this.referencesData[field.source] = data.list
        );;
    }*/
}