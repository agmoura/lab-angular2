package com.vixteam.teamaudit.core.domain;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vixteam.teamaudit.core.domain.baseentity.BaseEntity;
import com.vixteam.teamaudit.core.domain.enums.BooleanConverter;
import com.vixteam.teamaudit.core.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.core.domain.enums.SimNaoEnumConverter;
import java.util.List;


@Entity
@Table (name="CATOB")
@AttributeOverride(name="id", column=@Column(name = "CD_CATOB", columnDefinition = "CHAR(32)"))
public class CategoriaObjetivo extends BaseEntity {

    @ManyToOne
    @JoinColumn(name="CD_ESCPO", nullable=true)
    private Escopo escopo;  
	
    @NotNull
    @Size(max = 100)
    @Column(name="NM_CATOB", length=100, nullable=false)
    private String nome;

    @NotNull
    @Size(max = 255)
    @Column(name="DS_CATOB", length=255)
    private String descricao;

    @NotNull
    @Convert(converter = BooleanConverter.class)
    @Column(name="ID_CATOB_INTR_SIST", length=1, nullable=false)
    private Boolean indicadorInternoSistema;

    @OneToMany(mappedBy = "categoriaObjetivo")
    private List<Objetivo> objetivos;

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

    public List<Objetivo> getObjetivos() {
        return objetivos;
    }

    public void setObjetivos(List<Objetivo> objetivos) {
        this.objetivos = objetivos;
    }




    @OneToMany(mappedBy = "categoriaObjetivo")
    private List<Objetivo> objetivosPrimarios;

    public List<Objetivo> getObjetivosPrimarios() {
        return objetivosPrimarios;
    }

    public void setObjetivosPrimarios(List<Objetivo> objetivosPrimarios) {
        this.objetivosPrimarios = objetivosPrimarios;
    }

    @ManyToMany
    private List<Entidade> entidades;

    public List<Entidade> getEntidades() {
        return entidades;
    }

    public void setEntidades(List<Entidade> entidades) {
        this.entidades = entidades;
    }

    @Override
    public String toString() {
        return getNome();
    }
}
