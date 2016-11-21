
package com.vixteam.teamaudit.core.domain;

import com.vixteam.teamaudit.core.domain.baseentity.BaseEntity;

import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Processo
 * 
 */
@Entity
@Table(name = "UNAUD")
@AttributeOverride(name="id", column=@Column(name = "CD_UNAUD", columnDefinition = "CHAR(32)"))
public class Processo extends BaseEntity
{
    @NotNull
    @Size(max = 50)
    @Column(name = "NM_UNAUD", length = 50, nullable = false)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "CD_UOAUD", columnDefinition = "CHAR(32)")
    private UnidadeOrganizacional unidadeOrganizacional;

    /* TODO rodrigo.pimenta criar entidade Especialista */
    @Column(name = "CD_ESAUD", columnDefinition = "CHAR(32)", length = 32)
    private String codigoResponsavelProcesso;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_UNAUD_INCL", nullable = false)
    private Date dataInclusao;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_UNAUD_DESTV")
    private Date dataDesativacao;

    @ManyToOne
    @JoinColumn(name = "CD_UNAUD_PAI", columnDefinition = "CHAR(32)")
    private Processo processoPai;

    @Size(max = 100)
    @Column(name = "NO_UNAUD_ORDEM", length = 100)
    private String numeroOrdem;

    @NotNull
    @ManyToOne
    @JoinColumn (name = "CD_EOAUD", columnDefinition = "CHAR(32)", nullable = false)
    private Estrutura estrutura;

    /* Getters and Setters */
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public UnidadeOrganizacional getUnidadeOrganizacional() {
        return unidadeOrganizacional;
    }

    public void setUnidadeOrganizacional(UnidadeOrganizacional codigoUnidadeOrganizacionalAuditavel) {
        this.unidadeOrganizacional = codigoUnidadeOrganizacionalAuditavel;
    }

    public String getCodigoResponsavelProcesso() {
        return codigoResponsavelProcesso;
    }

    public void setCodigoResponsavelProcesso(String codigoResponsavelProcesso) {
        this.codigoResponsavelProcesso = codigoResponsavelProcesso;
    }

    public Date getDataInclusao() {
        return dataInclusao;
    }

    public void setDataInclusao(Date dataInclusaoProcesso) {
        this.dataInclusao = dataInclusaoProcesso;
    }

    public Date getDataDesativacao() {
        return dataDesativacao;
    }

    public void setDataDesativacao(Date dataDesativacaoProcesso) {
        this.dataDesativacao = dataDesativacaoProcesso;
    }

    public Processo getProcessoPai() {
        return processoPai;
    }

    public void setProcessoPai(Processo processoPai) {
        this.processoPai = processoPai;
    }

    public String getNumeroOrdem() {
        return numeroOrdem;
    }

    public void setNumeroOrdem(String numeroOrdemProcessoAuditavel) {
        this.numeroOrdem = numeroOrdemProcessoAuditavel;
    }

    public Estrutura getEstrutura() {
        return estrutura;
    }

    public void setEstrutura(Estrutura estrutura) {
        this.estrutura = estrutura;
    }
}
