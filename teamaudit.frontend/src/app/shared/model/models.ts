import {Link} from "./paged-list";

export abstract class EntityBase {
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
    escopo:Escopo | string;
}

export class Objetivo extends EntityBase {
    _links:{
        self:Link;
        categoriaObjetivo:Link;
        unidadeOrganizacional:Link
    };
    nome:string;
    descricao:string;
    descricaoMeta:string;
    valorMeta:number;
    percentualMeta:number;
    categoriaObjetivo:CategoriaObjetivo | string;
    unidadeOrganizacional:UnidadeOrganizacional | string;
}

export class UnidadeOrganizacional extends EntityBase {
    nome:string;
}