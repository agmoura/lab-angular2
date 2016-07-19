
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import com.vixteam.teamaudit.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.domain.enums.SimNaoEnumConverter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


/**
 * Categoria do RiscoPadrao
 */
@Entity
@Table(name = "CATRI")
public class CategoriaRisco implements IEntity<String> {

    @Id
    @Column(name = "CD_CATRI", columnDefinition = "CHAR(32)", length = 32)
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @ManyToOne
    @JoinColumn(name = "CD_ESCPO", columnDefinition = "CHAR(32)")
    private Escopo escopo;

    @NotNull
    @Size(max = 100)
    @Column(name = "NM_CATRI", length = 100, nullable = false)
    private String nome;

    @NotNull
    @Size(max = 255)
    @Column(name = "DS_CATRI", length = 255, nullable = false)
    private String descricao;

    @NotNull
    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name = "ID_CATRI_INTR_SIST", columnDefinition = "CHAR(1) DEFAULT N", length = 1, nullable = false)
    private SimNaoEnum indicadorInternoSistema = SimNaoEnum.Nao;

    @ManyToOne
    @JoinColumn(name = "CD_CATRI_PAI", columnDefinition = "CHAR(32)")
    private CategoriaRisco categoriaRiscoPai;

    @NotNull
    @Size(max = 100)
    @Column(name = "NO_CATRI_ORDEM", length = 100, nullable = false)
    private String ordem = "";

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_CCRSC", columnDefinition = "CHAR(32)", nullable = false)
    private ClassificacaoRisco classificacaoRisco;

    /* Getters and Setters */
    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public Escopo getEscopo() {
        return escopo;
    }

    public void setEscopo(Escopo escopo) {
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

    public SimNaoEnum getIndicadorInternoSistema() {
        return indicadorInternoSistema;
    }

    public void setIndicadorInternoSistema(SimNaoEnum indicadorInternoSistema) {
        this.indicadorInternoSistema = indicadorInternoSistema;
    }

    public CategoriaRisco getCategoriaRiscoPai() {
        return categoriaRiscoPai;
    }

    public void setCategoriaRiscoPai(CategoriaRisco categoriaRiscoPai) {
        this.categoriaRiscoPai = categoriaRiscoPai;
    }

    public String getOrdem() {
        return ordem;
    }

    public void setOrdem(String ordem) {
        this.ordem = ordem;
    }

    public ClassificacaoRisco getClassificacaoRisco() {
        return classificacaoRisco;
    }

    public void setClassificacaoRisco(ClassificacaoRisco classificacaoRisco) {
        this.classificacaoRisco = classificacaoRisco;
    }
}
