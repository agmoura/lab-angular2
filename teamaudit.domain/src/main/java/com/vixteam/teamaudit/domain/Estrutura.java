
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;


/**
 * Estrutura Organizacional Auditável
 * 
 */
@Entity
@Table(name = "EOAUD")
public class Estrutura implements IEntity<String>
{
    @Id
    @Column(name = "CD_EOAUD", columnDefinition = "CHAR(32)", length = 32)
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Size(max = 50)
    @Column(name = "NM_EOAUD", length = 50)
    private String nome;

    @Size(max = 255)
    @Column(name = "DS_EOAUD", length = 255)
    private String descricao;

    //@Column(name = "CD_UOAUD",columnDefinition = "CHAR(32)", length = 32)
    @ManyToOne
    @JoinColumn(name = "CD_UOAUD", columnDefinition = "CHAR(32)")
    private UnidadeOrganizacional unidadeOrganizacional;

    /* TODO rodrigo.pimenta incluir entidade Especialista */
    @Column(name = "CD_ESAUD", columnDefinition = "CHAR(32)", length = 32)
    private String responsavelEstrutura;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_EOAUD_INCL", nullable = false)
    private Date dataInclusao;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_EOAUD_DESTV")
    private Date dataDesativacao;

    @ManyToOne
    @JoinColumn(name = "CD_EOAUD_PAI", columnDefinition = "CHAR(32)", nullable = true)
    private Estrutura estruturaPai;

    @Size(max = 100)
    @Column(name = "NO_EOAUD_ORDEM", length = 100)
    private String numeroOrdem;

    @ManyToOne
    @JoinColumn(name = "CD_EOAUD_SIST_ORIG", nullable = true)
    private Estrutura estruturaSistemaOrigem;

    /* TODO rodrigo.pimenta criar entidade CategoriaEntidadesOrganizacionais */
    @NotNull
    @Column(name = "CD_CEOAT", columnDefinition = "CHAR(32)", length = 32, nullable = false)
    private String categoriaEntidadeOrganizacional;

    /* Getters and Setters */

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

    public UnidadeOrganizacional getUnidadeOrganizacional() {
        return unidadeOrganizacional;
    }

    public void setUnidadeOrganizacional(UnidadeOrganizacional unidadeOrganizacional) {
        this.unidadeOrganizacional = unidadeOrganizacional;
    }

    public String getResponsavelEstrutura() {
        return responsavelEstrutura;
    }

    public void setResponsavelEstrutura(String codigoResponsavelEstruturaOrganizacionalAuditavel) {
        this.responsavelEstrutura = codigoResponsavelEstruturaOrganizacionalAuditavel;
    }

    public Date getDataInclusao() {
        return dataInclusao;
    }

    public void setDataInclusao(Date dataInclusaoEstruturaOrganizacionalAuditavel) {
        this.dataInclusao = dataInclusaoEstruturaOrganizacionalAuditavel;
    }

    public Date getDataDesativacao() {
        return dataDesativacao;
    }

    public void setDataDesativacao(Date dataDesativacaoEstruturaOrganizacionalAuditavel) {
        this.dataDesativacao = dataDesativacaoEstruturaOrganizacionalAuditavel;
    }

    public Estrutura getEstruturaPai() {
        return estruturaPai;
    }

    public void setEstruturaPai(Estrutura codigoPaiEstruturaOrganizacionalAuditavel) {
        this.estruturaPai = codigoPaiEstruturaOrganizacionalAuditavel;
    }

    public String getNumeroOrdem() {
        return numeroOrdem;
    }

    public void setNumeroOrdem(String numeroOrdemEstruturaOrganizacionalAuditavel) {
        this.numeroOrdem = numeroOrdemEstruturaOrganizacionalAuditavel;
    }

    public Estrutura getEstruturaSistemaOrigem() {
        return estruturaSistemaOrigem;
    }

    public void setEstruturaSistemaOrigem(Estrutura codigoEstruturaOrganizacionalAuditavelSistemaOrigem) {
        this.estruturaSistemaOrigem = codigoEstruturaOrganizacionalAuditavelSistemaOrigem;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoriaEntidadeOrganizacional() {
        return categoriaEntidadeOrganizacional;
    }

    public void setCategoriaEntidadeOrganizacional(String categoriaEntidadeOrganizacional) {
        this.categoriaEntidadeOrganizacional = categoriaEntidadeOrganizacional;
    }
}