
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import com.vixteam.teamaudit.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.domain.enums.SimNaoEnumConverter;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;


/**
 * Visão Auditável
 * 
 */
@Entity
@Table(name = "VIAUD")
@AttributeOverride(name="id", column=@Column(name = "CD_VIAUD", columnDefinition = "CHAR(32)"))
public class VisaoAuditavel extends BaseEntity
{
    public VisaoAuditavel(String id, String nome, String descricao, UnidadeOrganizacional unidadeOrganizacional, String metricaRisco, Date dataInclusao, SimNaoEnum permiteCSAVisao, Date dataDesativacao, VisaoAuditavel visaoAuditavelOrigem, String visaoMatrizRisco) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.unidadeOrganizacional = unidadeOrganizacional;
        this.metricaRisco = metricaRisco;
        this.dataInclusao = dataInclusao;
        this.permiteCSAVisao = permiteCSAVisao;
        this.dataDesativacao = dataDesativacao;
        this.visaoAuditavelOrigem = visaoAuditavelOrigem;
        this.visaoMatrizRisco = visaoMatrizRisco;
    }

    public VisaoAuditavel() {
        super();
    }

    @NotNull
    @Size(max = 50)
    @Column(name = "NM_VIAUD", length = 50, nullable = false)
    private String nome;

    @NotNull
    @Size(max = 255)
    @Column(name = "DS_VIAUD", length = 255, nullable = false)
    private String descricao;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_UOAUD", columnDefinition = "CHAR(32)", nullable = false)
    private UnidadeOrganizacional unidadeOrganizacional;

    /* TODO rodrigo.pimenta implementar entidade MetricaRisco */
    @NotNull
    @Column(name = "CD_METRS", columnDefinition = "CHAR(32)", length = 32, nullable = false)
    private String metricaRisco;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_VIAUD_INCL", nullable = false)
    private Date dataInclusao;

    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name = "ID_VIAUD_PERMD_CSA", length = 1)
    private SimNaoEnum permiteCSAVisao;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_VIAUD_DESTV")
    private Date dataDesativacao;

    @ManyToOne
    @JoinColumn(name = "CD_VIAUD_ORIG", referencedColumnName = "CD_VIAUD", columnDefinition = "CHAR(32)")
    private VisaoAuditavel visaoAuditavelOrigem;

    @Column(name = "CD_VIMRI",columnDefinition = "CHAR(32)", length = 32)
    private String visaoMatrizRisco;

    /* Getters and Setters */
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

    public void setUnidadeOrganizacional(UnidadeOrganizacional codigoUnidadeOrganizacionalAuditavel) {
        this.unidadeOrganizacional = codigoUnidadeOrganizacionalAuditavel;
    }

    public String getMetricaRisco() {
        return metricaRisco;
    }

    public void setMetricaRisco(String metricaRisco) {
        this.metricaRisco = metricaRisco;
    }

    public Date getDataInclusao() {
        return dataInclusao;
    }

    public void setDataInclusao(Date dataInclusaoVisaoAuditavel) {
        this.dataInclusao = dataInclusaoVisaoAuditavel;
    }

    public SimNaoEnum getPermiteCSAVisao() {
        return permiteCSAVisao;
    }

    public void setPermiteCSAVisao(SimNaoEnum permiteCSAVisao) {
        this.permiteCSAVisao = permiteCSAVisao;
    }

    public Date getDataDesativacao() {
        return dataDesativacao;
    }

    public void setDataDesativacao(Date dataDesativacaoVisaoAuditavel) {
        this.dataDesativacao = dataDesativacaoVisaoAuditavel;
    }

    public VisaoAuditavel getVisaoAuditavelOrigem() {
        return visaoAuditavelOrigem;
    }

    public void setVisaoAuditavelOrigem(VisaoAuditavel visaoAuditavelOrigem) {
        this.visaoAuditavelOrigem = visaoAuditavelOrigem;
    }

    public String getVisaoMatrizRisco() {
        return visaoMatrizRisco;
    }

    public void setVisaoMatrizRisco(String visaoMatrizRisco) {
        this.visaoMatrizRisco = visaoMatrizRisco;
    }
}
