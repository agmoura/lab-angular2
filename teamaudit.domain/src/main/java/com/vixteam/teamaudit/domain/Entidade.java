
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;


/**
 * Entidade Auditora
 */
@Entity
@Table(name = "EQAUD")
public class Entidade
        implements IEntity<String> {

    @Id
    @Column(name = "CD_EQAUD", columnDefinition = "CHAR(32)", length = 32)
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Size(max = 50)
    @Column(name = "NM_EQAUD", length = 50, nullable = false)
    private String nome;

    @Size(max = 250)
    @Column(name = "DS_EQAUD", length = 250)
    private String descricao;

    // TODO: rodrigo.pimenta criar entidade CarteiraAtividade
    @Column(name = "CD_CATAT_ATV", columnDefinition = "CHAR(32)", length = 32)
    private String codigoCarteiraAtiva;

    @OneToOne
    @JoinColumn(name = "CD_PLAAT_ATV", referencedColumnName = "CD_PLAAT")
    private PlanoAnual planoAnualAtivo;

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "DT_INI", nullable = false)
    private Date dataInicio;

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "DT_FIM", nullable = false)
    private Date dataFim;

    @Column(name = "CD_IMPORTACAO", length = 10)
    private String codigoImportacao;

    @OneToMany(mappedBy = "entidade")
    private List<PlanoAnual> planosAnuaisAuditoria;

    /* Getters and Setters */

    public List<PlanoAnual> getPlanosAnuaisAuditoria() {
        return planosAnuaisAuditoria;
    }

    public void setPlanosAnuaisAuditoria(List<PlanoAnual> planosAnuaisAuditoria) {
        this.planosAnuaisAuditoria = planosAnuaisAuditoria;
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

    public String getCodigoCarteiraAtiva() {
        return codigoCarteiraAtiva;
    }

    public void setCodigoCarteiraAtiva(String codigoCarteiraAtiva) {
        this.codigoCarteiraAtiva = codigoCarteiraAtiva;
    }

    public Date getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(Date dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Date getDataFim() {
        return dataFim;
    }

    public void setDataFim(Date dataFim) {
        this.dataFim = dataFim;
    }

    public String getCodigoImportacao() {
        return codigoImportacao;
    }

    public void setCodigoImportacao(String codigoImportacao) {
        this.codigoImportacao = codigoImportacao;
    }

    @Override
    public String getId() {
        return this.id;
    }

    @Override
    public void setId(String s) {
        this.id = s;
    }
}
