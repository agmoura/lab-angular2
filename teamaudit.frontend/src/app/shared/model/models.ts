
export interface EntityBase {
    id:string;
    //_links:{ self:Link; };
}

export interface Escopo extends EntityBase {
    nome:string;
    descricao:string;
}

export interface CategoriaObjetivo extends EntityBase {
    nome:string;
    descricao:string;
    indicadorInternoSistema:string;
    escopo:Escopo;
}

export interface Objetivo extends EntityBase {
    nome:string;
    descricao:string;
    descricaoMeta:string;
    valorMeta:number;
    percentualMeta:number;
    categoriaObjetivo:CategoriaObjetivo;
    unidadeOrganizacional:UnidadeOrganizacional;
}

export interface UnidadeOrganizacional extends EntityBase {
    nome:string;
}

export interface ClassificacaoRisco extends EntityBase {
    nome:string;
    descricao:string;
    numeroNivel:number;
}

export interface CategoriaRisco extends EntityBase {
    nome:string;
    descricao:string;
    indicadorInternoSistema:string;
    ordem:string;
    escopo:Escopo;
    classificacaoRisco:ClassificacaoRisco;
    categoriaRiscoPai: CategoriaRisco;
}