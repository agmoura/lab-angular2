
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import com.vixteam.teamaudit.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.domain.enums.SimNaoEnumConverter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


/**
 * Origem Atividade de Auditoria
 * 
 */
@Entity
@Table(name = "ORATA")
public class OrigemAtividade implements IEntity<String>
{

    @Id
    @Column(name = "CD_ORATA", columnDefinition = "CHAR(32)", length = 32)
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Column(name = "NO_ORATA", length = 2, nullable = false)
    private String numero;

    @Size(max = 40)
    @Column(name = "NM_ORATA", length = 40)
    private String nome;

    @NotNull
    @Size(max = 100)
    @Column(name = "DS_ORATA", length = 100, nullable = false)
    private String descricao;

    @Column(name = "VL_ORATA_NOTA")
    private Float notaPadrao;

    @ManyToOne
    @JoinColumn(name = "CD_TPAUD", columnDefinition = "CHAR(32)")
    private TipoAuditoria tipoAuditoria;

    @NotNull
    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name="ID_ORATA_INTR_SIST", columnDefinition = "CHAR(1) DEFAULT 'N'", length = 1, nullable = false)
    private SimNaoEnum padraoSistema;

    @NotNull
    @Column(name = "PC_ORATA_DISTR", nullable = false)
    private Float percentualDistribuicao;

    /* Getters and Setters */

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
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

    public Float getNotaPadrao() {
        return notaPadrao;
    }

    public void setNotaPadrao(Float valorNotaPadraoOrigemAtividadeAuditoria) {
        this.notaPadrao = valorNotaPadraoOrigemAtividadeAuditoria;
    }

    public TipoAuditoria getTipoAuditoria() {
        return tipoAuditoria;
    }

    public void setTipoAuditoria(TipoAuditoria tipoAuditoria) {
        this.tipoAuditoria = tipoAuditoria;
    }

    public SimNaoEnum getPadraoSistema() {
        return padraoSistema;
    }

    public void setPadraoSistema(SimNaoEnum origemAtividadePadraoSistema) {
        this.padraoSistema = origemAtividadePadraoSistema;
    }

    public Float getPercentualDistribuicao() {
        return percentualDistribuicao;
    }

    public void setPercentualDistribuicao(Float percentualDistribuicaoOrigemAtividadeAuditoria) {
        this.percentualDistribuicao = percentualDistribuicaoOrigemAtividadeAuditoria;
    }
}
