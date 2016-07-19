
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
 * Tipo Especial de Controle
 * 
 */
@Entity
@Table(name = "TPECR")
public class TipoEspecialControle implements IEntity<String>
{
    @Id
    @Column(name = "CD_TPECR")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Size(max = 100)
    @Column(name = "NM_TPECR", length = 100, nullable = false)
    private String nome;

    @NotNull
    @Size(max = 255)
    @Column(name = "DS_TPECR", nullable = false)
    private String descricao;

    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name = "ID_TPECR_INTR_SIST")
    private SimNaoEnum identificadorInternoSistema;// = SimNaoEnum.Nao;

    @ManyToMany(mappedBy = "listaTipoEspecialControle")
    private List<ControlePadrao> listaControlePadrao;

    /* Getters and Setters*/

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

    public List<ControlePadrao> getListaControlePadrao() {
        return listaControlePadrao;
    }

    public void setListaControlePadrao(List<ControlePadrao> listaControlePadrao) {
        this.listaControlePadrao = listaControlePadrao;
    }

    @Override
    public int hashCode() {
        return new Long(id).hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (! (obj instanceof TipoEspecialControle)) {
            return false;
        }
        return this.id == ((TipoEspecialControle)obj).getId();
    }
}
