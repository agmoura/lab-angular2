
package com.vixteam.teamaudit.core.domain;

import com.vixteam.teamaudit.core.domain.enums.TipoPlanoAnualEnum;
import com.vixteam.teamaudit.core.domain.enums.TipoPlanoAnualEnumConverter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


/**
 * Plano Anual de Auditoria
 */
@Entity
@Table(name = "PLAAT")
@AttributeOverride(name="id", column=@Column(name = "CD_PLAAT", columnDefinition = "CHAR(32)"))
public class PlanoAnual extends BaseEntity {
    @NotNull
    @Column(name = "NO_PLAAT_ANO", nullable = false)
    private Integer numero;

    @NotNull
    @Column(name = "NO_PLAAT_VERS", nullable = false)
    private Integer versao;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_EQAUD", nullable = false)
    private Entidade entidade;

    @OneToOne
    @JoinColumn(name = "CD_PLAAT_ORIG")
    private PlanoAnual planoAnualOrigem;

    @Convert(converter = TipoPlanoAnualEnumConverter.class)
    @Column(name = "CD_TPPLT", columnDefinition = "CHAR(32)", length = 32)
    private TipoPlanoAnualEnum tipoPlanoAnual;

    @NotNull
    @Column(name = "NO_PLAAT_ORDEM", nullable = false)
    private String numeroOrdem;

    /* Getters and Setters */
    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numeroPlanoAnualAuditoria) {
        this.numero = numeroPlanoAnualAuditoria;
    }

    public String getNome() {
        String nome = "";
        nome += this.getNumero() + "/" + this.getVersao();
        nome += " - (Nº " + this.getNumeroOrdem() + ")";
        return nome;
    }

    public Integer getVersao() {
        return versao;
    }

    public void setVersao(Integer versaoPlanoAnualAuditoria) {
        this.versao = versaoPlanoAnualAuditoria;
    }

    public Entidade getEntidade() {
        return entidade;
    }

    public void setEntidade(Entidade entidade) {
        this.entidade = entidade;
    }

    public PlanoAnual getPlanoAnualOrigem() {
        return planoAnualOrigem;
    }

    public void setPlanoAnualOrigem(PlanoAnual planoAnualOrigem) {
        this.planoAnualOrigem = planoAnualOrigem;
    }

    public TipoPlanoAnualEnum getTipoPlanoAnual() {
        return tipoPlanoAnual;
    }

    public void setTipoPlanoAnual(TipoPlanoAnualEnum tipoPlanoAnual) {
        this.tipoPlanoAnual = tipoPlanoAnual;
    }

    public String getNumeroOrdem() {
        return numeroOrdem;
    }

    public void setNumeroOrdem(String numeroPlanoAnualAuditoriaOrdem) {
        this.numeroOrdem = numeroPlanoAnualAuditoriaOrdem;
    }
}
