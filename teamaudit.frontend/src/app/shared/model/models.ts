import {Link} from "./paged-list";

export class EntityBase {
    id:string;
    _links:{ self:Link; };
}

export class Escopo extends EntityBase {
    nome:string;
    descricao:string;
}

export class CategoriaObjetivo extends EntityBase {
    nome:string;
    descricao:string;
    indicadorInternoSistema:string;
    escopo:Escopo;
}

export class Objetivo extends EntityBase {
    nome:string;
    descricao:string;
    descricaoMeta:string;
    valorMeta:number;
    percentualMeta:number;
    categoriaObjetivo:CategoriaObjetivo;
    unidadeOrganizacional:UnidadeOrganizacional;
}

export class UnidadeOrganizacional extends EntityBase {
    nome:string;
}