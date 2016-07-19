
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import com.vixteam.teamaudit.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.domain.enums.SimNaoEnumConverter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;


/**
 * Objetivo Auditoria do Controle
 * 
 */
@Entity
@Table(name = "OBACR")
public class ObjetivoAuditoria implements IEntity<String>
{
    @Id
    @Column(name = "CD_OBACR")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Size(max = 100)
    @Column(name = "NM_OBACR", length = 100, nullable = false)
    private String nome;

    @NotNull
    @Size(max = 255)
    @Column(name = "DS_OBACR", length = 255, nullable = false)
    private String descricao;

    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name = "ID_OBACR_INTR_SIST")
    private SimNaoEnum identificadorInternoSistema;// = SimNaoEnum.Nao;

    @ManyToMany(mappedBy = "listaObjetivoAuditoria")
    List<RiscoPadrao> listaRiscoPadrao;

    @ManyToMany(mappedBy = "listaObjetivoAuditoria")
    List<ControlePadrao> listaControlePadrao;

    /* Getters and Setters */
    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
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

    public SimNaoEnum getIdentificadorInternoSistema() {
        return identificadorInternoSistema;
    }

    public void setIdentificadorInternoSistema(SimNaoEnum identificadorInternoSistema) {
        this.identificadorInternoSistema = identificadorInternoSistema;
    }

    public List<RiscoPadrao> getListaRiscoPadrao() {
        return listaRiscoPadrao;
    }

    public void setListaRiscoPadrao(List<RiscoPadrao> listaRiscoPadrao) {
        this.listaRiscoPadrao = listaRiscoPadrao;
    }

    public List<ControlePadrao> getListaControlePadrao() {
        return listaControlePadrao;
    }

    public void setListaControlePadrao(List<ControlePadrao> listaControlePadrao) {
        this.listaControlePadrao = listaControlePadrao;
    }
}
