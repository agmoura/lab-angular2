export enum FieldType {
    Hidden, Text, RichText, Number, Boolean, Date, Reference, ReferenceMany
}

export enum ReferenceType {
    OneToMany, ManyToOne, ManyToMany, OneToOne
}

export interface ResourceSchemaMap {
    [resource: string]: ResourceSchema;
}

export interface ResourceSchema {
    listView: ListViewSchema;
    formView: FormViewSchema;
    treeView?: TreeViewSchema;
}

export interface ListViewSchema {
    fields: ListFieldSchema[];
    orders?: string[];
    filter?: any;
    select?: boolean;

    actions?: ActionSchema[];
    insert?: boolean;
    link?: boolean;
}

export interface FormViewSchema {
    fields: FormFieldSchema[];
    references?: ReferenceSchema[];
}

//TODO: Refatorar
export interface TreeViewSchema {
    loadFrom?: string;
    recursiveRelationship?: boolean;
    treeNodes: TreeNodeSchema[];
}

export interface ReferenceSchema extends ResourceSchema {
    resource: string;
    type: ReferenceType;
    target: string;
    targetInverse?: string;

    /*targetId: {path: string};
    referencePath?: string;
    relationPath?: {path: string};
    childSelectListView?: ListViewSchema;*/
}

export interface FieldSchema {
    source: string;         // Field Name
    type?: FieldType;       // Field Type

    label?: string;         // Field Label Key - Default: UpperCase(Resource + '.' + Source)
    required?: boolean;     // Indica que este campo é obrigatorio
    hidden?: boolean;
    isEnum?: boolean;       // Indica se os valores selecionaveis deste campo são enums. Default: false
    index?: number;         // Field Index - Read Only
}

export interface ListFieldSchema extends FieldSchema {

}

export interface FormFieldSchema extends FieldSchema {
    referencePath?: string; // TODO REMOPVER - nome correto do tipo do objeto para considerar ao inves do path
    dependsOn?: string;     // TODO REMOVER - Nao é mais usado?
    isParent?: boolean;                 // Indica que este campo é o 'Parent' desta entidade

    readOnly?: boolean;                 // Indica que o campo é readOnly
    select?: EntitySelectFieldSchema;   // Schema utilizado para definir campos que são definidos a partir de itens selecionaveis
}

export interface EntitySelectFieldSchema {
    // O nome da entidade de onde os dados do select virão, geralmente não deve ser informado
    // pois é usado o nome do Path do field onde este schema é definido, use-o apenas
    // quando o nome no Path não refletir realmente o nome da entidade no banco de dados
    entityName?: string;

    // O nome do campo que contém o valor deste campo selecionavel, não informar quando estiver trabalhando
    // com enums, pois o valor será o nome da constante do enum que deve vir na propriedade enumConstantName!
    value: string;

    text: string;           // O nome do campo que contém o Label deste campo selecionavel
    loadFrom?: string;      // Indica uma URL específica de onde virão os dados selecionaveis para o campo
    filter?: any;           // Indica um filtro específico de acordo com um campo
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
