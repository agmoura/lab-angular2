package com.vixteam.teamaudit.core.usecase.objetivo;

import com.vixteam.teamaudit.core.domain.UnidadeOrganizacional;
import com.vixteam.teamaudit.core.domain.objetivo.CategoriaObjetivo;

public class ObjetivoDto {

    private String id;

    private String nome;

    private String descricao;

    private UnidadeOrganizacional unidadeOrganizacional; //TODO: Criar DTO

    private CategoriaObjetivoDto categoriaObjetivo;

    private String descricaoMeta;

    private Double valorMeta;

    private Double percentualMeta;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public UnidadeOrganizacional getUnidadeOrganizacional() {
        return unidadeOrganizacional;
    }

    public void setUnidadeOrganizacional(UnidadeOrganizacional unidadeOrganizacional) {
        this.unidadeOrganizacional = unidadeOrganizacional;
    }

    public CategoriaObjetivoDto getCategoriaObjetivo() {
        return categoriaObjetivo;
    }

    public void setCategoriaObjetivo(CategoriaObjetivoDto categoriaObjetivo) {
        this.categoriaObjetivo = categoriaObjetivo;
    }

    public String getDescricaoMeta() {
        return descricaoMeta;
    }

    public void setDescricaoMeta(String descricaoMeta) {
        this.descricaoMeta = descricaoMeta;
    }

    public Double getValorMeta() {
        return valorMeta;
    }

    public void setValorMeta(Double valorMeta) {
        this.valorMeta = valorMeta;
    }

    public Double getPercentualMeta() {
        return percentualMeta;
    }

    public void setPercentualMeta(Double percentualMeta) {
        this.percentualMeta = percentualMeta;
    }
    private CategoriaObjetivo categoriaObjetivoPrimaria;

    public CategoriaObjetivo getCategoriaObjetivoPrimaria() {
        return categoriaObjetivoPrimaria;
    }

    public void setCategoriaObjetivoPrimaria(CategoriaObjetivo categoriaObjetivoPrimaria) {
        this.categoriaObjetivoPrimaria = categoriaObjetivoPrimaria;
    }

    @Override
    public String toString() {
        return getNome();
    }
}