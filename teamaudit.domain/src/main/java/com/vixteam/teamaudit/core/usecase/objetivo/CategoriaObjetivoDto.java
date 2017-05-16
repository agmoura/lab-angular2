package com.vixteam.teamaudit.core.usecase.objetivo;

import com.vixteam.teamaudit.core.domain.Escopo;

public class CategoriaObjetivoDto {

    private String id;

    private Escopo escopo; //TODO: Criar DTO
	
    private String nome;

    private String descricao;

    private Boolean indicadorInternoSistema;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Escopo getEscopo () {
    	return escopo;
    }
	
    public void setEscopo (Escopo escopo) {
    	this.escopo = escopo;
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

    public Boolean getIndicadorInternoSistema() {
        return indicadorInternoSistema;
    }

    public void setIndicadorInternoSistema(Boolean indicadorInternoSistema) {
        this.indicadorInternoSistema = indicadorInternoSistema;
    }
}
