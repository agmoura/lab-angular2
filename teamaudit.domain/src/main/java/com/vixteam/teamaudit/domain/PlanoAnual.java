
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import com.vixteam.teamaudit.domain.enums.TipoPlanoAnualEnum;
import com.vixteam.teamaudit.domain.enums.TipoPlanoAnualEnumConverter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


/**
 * Plano Anual de Auditoria
 */
@Entity
@Table(name = "PLAAT")
public class PlanoAnual
        implements IEntity<String> {
    @Id
    @Column(name = "CD_PLAAT", columnDefinition = "CHAR(32)", length = 32)
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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
