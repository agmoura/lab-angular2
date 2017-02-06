/*export interface EntitySchema {
 label: {singular: string, plural: string};
 id: {index?: number; path: string};
 listView: {
 fields: EntityFieldSchema[],
 sorts: string[]
 };
 formView: {
 fields: EntityFieldSchema[]
 };
 }

 export interface EntitySchemaMap {
 [entityPath: string]: EntitySchema;
 }

 export interface EntityFieldSchema {
 index?: number;
 label: string;
 path: string;
 referencePath?: string;
 type?: string;
 required?: boolean;
 select?: {value: string, text: string};
 }*/

export interface EntitySchemaMap {
    [entityPath: string]: EntitySchema;
}

export interface EntitySchema {
// O nome da entidade do qual o schema se trata, uso necessário apenas ao definir um EntitySchmea nos Details de um FormView.

    listView: ListViewSchema;
    formView: FormViewSchema;
    treeView?: TreeViewSchema;

    label?: {singular: string, plural: string};
    parentId?: any; // TODO REMOVER
}

export interface ListViewSchema {
    fields: EntityColumnSchema[];
    orders?: string[];
    filter?: any;
    select?: boolean;
    actions?: ActionSchema[];
    insert?: boolean;
    link?: boolean;

}

export interface FormViewSchema {
    fields: EntityFormFieldSchema[];
    relationships?: RelationshipSchema[];
    details?: EntitySchema[];
}

export interface TreeViewSchema {
    loadFrom?: string;
    recursiveRelationship?: boolean;
    treeNodes: TreeNodeSchema[];
}

export interface RelationshipSchema extends EntitySchema {
    path: string;
    type: RelationshipType;
    referencePath?: string;
    relationPath?: {path: string};
    childSelectListView?: ListViewSchema;
}

export interface EntityFieldSchema {
    path: string;       // O caminho para o campo em sua entidade
    index?: number;     // TODO REMOVER
    label?: string;     // O label do campo
    isEnum?: boolean;   // Indica se os valores selecionaveis deste campo são enums. Default: false
}

export interface EntityColumnSchema extends EntityFieldSchema {
    hidden?: boolean;
}

export interface EntityFormFieldSchema extends EntityFieldSchema {
    referencePath?: string; // TODO REMOPVER - nome correto do tipo do objeto para considerar ao inves do path
    dependsOn?: string;     // TODO REMOVER - Nao é mais usado?
    type?: FieldType;               // Indica o Tipo do campo a ser renderizado
    isParent?: boolean;                 // Indica que este campo é o 'Parent' desta entidade
    required?: boolean;                 // Indica que este campo é obrigatorio
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
    fields: EntityColumnSchema[];   // Configuração dos campos a exibir na arvore
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

export enum FieldType {
    Hidden, Text, RichText, Number, Boolean, Date, Reference, ReferenceMany
}

export enum RelationshipType {
    OneToMany, ManyToOne, ManyToMany, OneToOne
}


/*export class TextInput implements EntityFormFieldSchema {
    public type?: FieldType = FieldType.Text;

    constructor(public path: string) {
    }
}

export class ReferenceInput implements EntityFormFieldSchema {
    public type: FieldType = FieldType.Reference;

    constructor(public path: string, public referencePath: string = null) {

    }
}*/
