package com.vixteam.teamaudit.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vixteam.framework.domain.IEntity;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table (name="OBJEM")
public class Objetivo implements IEntity<String> {

    @Id
    @GeneratedValue
    @Column(name="CD_OBJEM" ,length=32, columnDefinition = "CHAR(32)")
    private String id;

    @NotNull
    @Size(max = 60)
    @Column(name="NM_OBJEM", length=60, nullable=false)
    private String nome;

    @NotNull
    @Size(max = 255)
    @Column(name="DS_OBJEM", length=255, nullable=false)
    private String descricao;

    @NotNull
    @ManyToOne
    @JoinColumn(name="CD_UOAUD", nullable=false)
    private UnidadeOrganizacional unidadeOrganizacional;

    @NotNull
    @ManyToOne
    @JoinColumn(name="CD_CATOB", nullable=false)
    private CategoriaObjetivo categoriaObjetivo;

    @Size(max = 255)
    @Column(name="DS_OBJEM_META", length=255)
    private String descricaoMeta;

    @Column(name="VL_OBJEM_META", precision = 17, scale = 2)
    private Double valorMeta;

    @Column(name="PC_OBJEM_META", precision = 7, scale = 2)
    private Double percentualMeta;

    @Override
    public String getId() {
        return id;
    }

    @Override
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

    public CategoriaObjetivo getCategoriaObjetivo() {
        return categoriaObjetivo;
    }

    public void setCategoriaObjetivo(CategoriaObjetivo categoriaObjetivo) {
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
}