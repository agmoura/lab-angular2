import {FormGroup, ValidatorFn, AbstractControlOptions} from "@angular/forms";
import {DataSourceDefinition} from "../shared/data-source";

export enum FieldType {
    Hidden, Text, RichText, Number, Boolean, Date, Reference, ReferenceMany, Group
}

export enum ReferenceType {
    OneToMany, ManyToOne, ManyToMany, OneToOne
}

export interface ResourceSchemaMap {
    [resource: string]: ResourceSchema;
}

export interface FormFieldSchemaMap {
    [field: string]: FormFieldSchema;
}

export class ResourceSchema {
    readonly listView: ListViewSchema;
    readonly formView: FormViewSchema;

    public constructor(data?: Partial<ResourceSchema>) {
        this.listView = new ListViewSchema(data.listView);
        this.formView = new FormViewSchema(data.formView);
    }
}

export class ListViewSchema {
    readonly fields: ListFieldSchema[];
    readonly orders?: string[];
    readonly filter?: any;

    readonly actions?: ActionSchema[];
    readonly select?: boolean;
    readonly insert?: boolean;
    readonly link?: boolean;

    public constructor(data?: Partial<ListViewSchema>) {
        Object.assign(this, data);
        /*this.fields = data.fields;
        this.orders = data.orders;
        this.filter = data.filter;
        this.actions = data.actions;
        this.select = data.select;
        this.insert = data.insert;
        this.link = data.link;*/
    }
}

export class FormViewSchema {
    readonly fields: FormFieldSchema[];
    readonly references?: ReferenceSchema[];

    readonly fieldsMap?: FormFieldSchemaMap;

    public constructor(data?: Partial<FormViewSchema>) {
        this.fields = data.fields;
        this.references = (data.references || []).map(reference => new ReferenceSchema(reference));
        this.fieldsMap = FormViewSchema.buildFieldsMap(this.fields);
    }

    private static buildFieldsMap(fields: FormFieldSchema[]): FormFieldSchemaMap {
        const fieldsMap = {};
        fields.forEach(field => {
            if (field.type === FieldType.Group)
                fieldsMap[field.source] = this.buildFieldsMap(field.fields);
            else
                fieldsMap[field.source] = field
        });

        return fieldsMap;
    }
}

export class ReferenceSchema extends ResourceSchema {
    readonly resource: string;
    readonly type: ReferenceType;
    readonly target: string;
    readonly targetInverse?: string;

    public constructor(data?: Partial<ReferenceSchema>) {
        super(data);
        this.resource = data.resource;
        this.type = data.type;
        this.target = data.target;
        this.targetInverse = data.targetInverse;
    }
}

export interface FieldSchema {
    source: string;         // Field Name
    type?: FieldType;       // Field Type
    label?: string;         // Field Label Key - Default: UpperCase(Resource + '.' + Source)
    required?: boolean;     // Indica que este campo é obrigatorio
    hidden?: boolean;
    index?: number;         // Field Index - Read Only
}

export interface ListFieldSchema extends FieldSchema {

}

export interface FormFieldSchema extends FieldSchema {
    readOnly?: boolean;
    defaultValue?: (field: FormFieldSchema) => any,
    validators?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;

    // FieldType.Reference and FieldType.ReferenceMany
    dataSource?: DataSourceDefinition<any>;

    // FieldType.Group
    fields?: FormFieldSchema[];

    // Events
    onChange?: (value: any, form: FormGroup, fields: FormFieldSchemaMap) => void;
}

export interface TreeNodeSchema {
    entityLabel: string;            // O label da entidade exemplo: Atividade da Auditoria
    entityName: string;             // O nome da entidade exemplo: AuditoriaAtividade
    entityLabelPath?: string;       // O campo no objeto da entidade com o nome da mesma, exemplo: Atividade da auditoria XPTO
    parentPath: string;             // O campo da entidade com o qual este nó se liga ao nó anterior
    fields: ListFieldSchema[];   // Configuração dos campos a exibir na arvore
    actionsVisible?: boolean;       // Indica se as ações de incluir, editar e excluir estarão fisiveis na arvore, default: true
    sorts?: string[]; // TODO TROCAR PAR ORDERS              // Paths usados para ordenar os resultados da arvore
}

export interface ActionSchema {
    label: string;
    icon: string;
    actionPath?: string;
    actionTsFunction?: string;
    getSucessRedirectCommandsFunction?: Function;
    successMessage?: string;
    parameterSelectedEntities?: boolean;
}


/*export class TextInput implements FormFieldSchema {
 public type?: FieldType = FieldType.Text;

 constructor(public path: string) {
 }
 }

 export class ReferenceInput implements FormFieldSchema {
 public type: FieldType = FieldType.Reference;

 constructor(public path: string, public referencePath: string = null) {

 }
 }*/
