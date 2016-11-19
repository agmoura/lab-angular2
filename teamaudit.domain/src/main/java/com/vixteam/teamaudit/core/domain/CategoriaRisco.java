
package com.vixteam.teamaudit.core.domain;

import com.vixteam.teamaudit.core.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.core.domain.enums.SimNaoEnumConverter;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Categoria do RiscoPadrao
 */
@Entity
@Table(name = "CATRI")
@AttributeOverride(name="id", column=@Column(name = "CD_CATRI", columnDefinition = "CHAR(32)"))
public class CategoriaRisco extends BaseEntity{

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
    @Column(name = "ID_CATRI_INTR_SIST", length = 1, nullable = false)
    private SimNaoEnum indicadorInternoSistema = SimNaoEnum.Nao;

    @ManyToOne
    @JoinColumn(name = "CD_CATRI_PAI")
    private CategoriaRisco categoriaRiscoPai;

    @NotNull
    @Size(max = 100)
    @Column(name = "NO_CATRI_ORDEM", length = 100, nullable = false)
    private String ordem = "";

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_CCRSC", nullable = false)
    private ClassificacaoRisco classificacaoRisco;

    /* Getters and Setters */
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
