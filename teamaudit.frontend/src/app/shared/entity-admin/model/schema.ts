import {FormGroup, FormControl, ValidatorFn, AbstractControlOptions} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAction} from './actions';

export enum FieldType {
    Hidden, Text, RichText, Number, Boolean, Date, Reference, ReferenceMany, Group
}

export enum ReferenceType {
    OneToMany, ManyToOne, ManyToMany, OneToOne
}

export interface ResourceSchemaMap {
    [resource: string]: ResourceSchema;
}


// INTERFACES

export interface IResource {
    listView: IListView;
    formView: IFormView;
}

export interface IListView {
    fields: IListField<any>[];
    actions?: IAction<any>[];
    orders?: string[];
    filter?: any;
}

export interface IFormView {
    fields: IFormField<any>[];
    actions?: IAction<any>[];
    references?: IReference[];
}

export interface IField {
    source: string;         // Field Name
    type?: FieldType;       // Field Type
    label?: string;         // Field Label Key - Default: UpperCase(Resource + '.' + Source)
    required?: boolean;
    hidden?: boolean;
}

export interface IListField<T> extends IField {

}

export interface IFormField<T> extends IField {
    readOnly?: boolean;
    defaultValue?: (field: IFormField<T>) => T;
    validators?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
    dataSource?: IDataSource<T>; // FieldType.Reference and FieldType.ReferenceMany
    fields?: IFormField<any>[];  // FieldType.Group
    onChange?: (value: T, form: FormGroup, fields: IFormFieldMap) => void; // Events
}

export interface IFormFieldMap {
    [field: string]: IFormField<any>;
}

export interface IDataSource<T> {
    valueField: string | number;
    textField: string | number;
    compare(item1: T, item2: T): boolean;
    execute(http: HttpClient): Observable<T[]>;
}

export interface IReference extends IResource {
    resource: string;
    type: ReferenceType;
    target: string;
    targetInverse?: string;
}


// IMPLEMENTATIONS

export class ResourceSchema implements IResource {
    readonly resource: string;
    readonly listView: ListViewSchema;
    readonly formView: FormViewSchema;

    public constructor(resource: string, data: IResource) {
        this.resource = resource;
        this.listView = new ListViewSchema(resource, data.listView);
        this.formView = new FormViewSchema(resource, data.formView);
    }
}

export class ListViewSchema implements IListView {
    readonly fields: ListFieldSchema<any>[];
    readonly actions: IAction<any>[];
    readonly orders: string[];
    readonly filter: any;

    public constructor(resource: string, data: IListView) {
        this.fields = FieldsSchema.toListFields(resource, data.fields, 0);
        this.orders = data.orders;
        this.filter = data.filter;
        this.actions = data.actions;
    }
}

export class FormViewSchema implements IFormView {
    readonly fields: FormFieldSchema<any>[];
    readonly actions: IAction<any>[];
    readonly references: ReferenceSchema[];
    readonly fieldsMap: IFormFieldMap; // Calculated Field

    public constructor(resource: string, data: IFormView) {
        this.fields = FieldsSchema.toFormFields(resource, data.fields, 0);
        this.actions = data.actions;
        this.references = (data.references || []).map(reference => new ReferenceSchema(reference));
        this.fieldsMap = this.buildFieldsMap(this.fields);
    }

    private buildFieldsMap(fields: IFormField<any>[]): IFormFieldMap {
        const fieldsMap = {};
        fields.forEach(field =>
            fieldsMap[field.source] = field.type === FieldType.Group ? this.buildFieldsMap(field.fields) : field
        );

        return fieldsMap;
    }

    public createForm(): FormGroup {
        const group = this.createFormBase(this.fields);
        group.addControl('id', new FormControl());
        return group;
    }

    private createFormBase(fields: FormFieldSchema<any>[]): FormGroup {
        let group = new FormGroup({});

        fields.forEach(field => {
            if(field.type === FieldType.Group)
                return group.addControl(field.source, this.createFormBase(field.fields));

            const control = new FormControl(field.defaultValue && field.defaultValue(field), field.validators);
            group.addControl(field.source, control);

            if (field.onChange)
                control.valueChanges
                    .subscribe(value => field.onChange(value, group, this.fieldsMap));

        });

        return group;
    }
}

class FieldsSchema {

    static index: number = 0;

    public static toListFields(resource: string, fields: IListField<any>[], index: number = undefined): ListFieldSchema<any>[] {
        if (!fields) return undefined;
        this.index = index !== undefined ? index : this.index;
        return fields.map(field => new ListFieldSchema(resource, this.index++, field))
    }

    public static toFormFields(resource: string, fields: IFormField<any>[], index: number = undefined): FormFieldSchema<any>[] {
        if (!fields) return undefined;
        this.index = index !== undefined ? index : this.index;
        return fields.map(field => new FormFieldSchema(resource, this.index++, field))
    }


}

export abstract class FieldSchema implements IField {
    readonly source: string;        // Field Name
    readonly type: FieldType;       // Field Type
    readonly label: string;         // Field Label Key - Default: UpperCase(Resource + '.' + Source)
    readonly required: boolean;
    readonly hidden: boolean;
    readonly index: number;

    constructor(resource: string, index: number, data: IField) {
        this.source = data.source;
        this.type = data.type;
        this.label = data.label || (resource + '.' + data.source).toUpperCase();
        this.required = data.required;
        this.hidden = data.hidden;
        this.index = index;
    }
}

export class FormFieldSchema<T> extends FieldSchema implements IFormField<T> {
    readonly readOnly: boolean;
    readonly defaultValue: (field: IFormField<T>) => any;
    readonly validators: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
    readonly dataSource: IDataSource<T>; // FieldType.Reference and FieldType.ReferenceMany
    readonly fields: FormFieldSchema<any>[]; // FieldType.Group
    readonly onChange: (value: T, form: FormGroup, fields: IFormFieldMap) => void;

    constructor(resource: string, index: number, data: IFormField<T>) {
        super(resource, index, data);
        this.readOnly = data.readOnly;
        this.defaultValue = data.defaultValue;
        this.validators = data.validators;
        this.dataSource = data.dataSource;
        this.fields = FieldsSchema.toFormFields(this.label, data.fields);
        this.onChange = data.onChange;
    }
}

export class ListFieldSchema<T> extends FieldSchema implements IListField<T> {
    constructor(resource: string, index: number, data: IListField<T>) {
        super(resource, index, data);
    }
}

export class ReferenceSchema extends ResourceSchema implements IReference {
    readonly resource: string;
    readonly type: ReferenceType;
    readonly target: string;
    readonly targetInverse: string;

    public constructor(data?: IReference) {
        super(data.resource, data);
        this.resource = data.resource;
        this.type = data.type;
        this.target = data.target;
        this.targetInverse = data.targetInverse;
    }
}
