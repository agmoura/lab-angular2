package com.vixteam.teamaudit.core.domain;

import com.vixteam.teamaudit.core.domain.baseentity.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by jeferson.carneiro on 20/05/2016.
 */

@Entity
@Table(name="CVAUD")
@AttributeOverride(name="id", column=@Column(name = "CD_CVAUD", columnDefinition = "CHAR(32)"))
public class Composicao extends BaseEntity {

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_VIAUD", columnDefinition = "CHAR(32)", nullable = false)
    private VisaoAuditavel visaoAuditavel;

    @OneToOne
    @JoinColumn(name = "CD_CVAUD_ORIG", columnDefinition = "CHAR(32)")
    private Composicao composicaoOrigem;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_UNAUD", columnDefinition = "CHAR(32)", nullable = false)
    private Processo processo;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_EOAUD", columnDefinition = "CHAR(32)", nullable = false)
    private Estrutura estrutura;

    /* Getters and Setters */
    public String getNome() {
        String str = "";

        str += visaoAuditavel.getNome() + " >> ";
        str += estrutura.getNome() + " >> ";
        str += processo.getNome();

        return str;
    }

    public VisaoAuditavel getVisaoAuditavel() {
        return visaoAuditavel;
    }

    public void setVisaoAuditavel(VisaoAuditavel visaoAuditavel) {
        this.visaoAuditavel = visaoAuditavel;
    }

    public Composicao getComposicaoOrigem() {
        return composicaoOrigem;
    }

    public void setComposicaoOrigem(Composicao composicaoOrigem) {
        this.composicaoOrigem = composicaoOrigem;
    }

    public Processo getProcesso() {
        return processo;
    }

    public void setProcesso(Processo processo) {
        this.processo = processo;
    }

    public Estrutura getEstrutura() {
        return estrutura;
    }

    public void setEstrutura(Estrutura estrutura) {
        this.estrutura = estrutura;
    }
}
