
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import com.vixteam.teamaudit.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.domain.enums.SimNaoEnumConverter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


/**
 * Origem do Risco
 */
@Entity
@Table(name = "ORGRI")
public class OrigemRisco implements IEntity<String> {
    @Id
    @Column(name = "CD_ORGRI", columnDefinition = "CHAR(32)", length = 32)
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Size(max = 100)
    @Column(name = "NM_ORGRI", length = 100, nullable = false)
    private String nome;

    @NotNull
    @Size(max = 255)
    @Column(name = "DS_ORGRI", nullable = false)
    private String descricao;

    @NotNull
    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name = "ID_ORGRI_INTR_SIST", length = 1, nullable = false)
    private SimNaoEnum indicadorInternoSistema = SimNaoEnum.Nao;

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

    public SimNaoEnum getIndicadorInternoSistema() {
        return indicadorInternoSistema;
    }

    public void setIndicadorInternoSistema(SimNaoEnum indicadorInternoSistema) {
        this.indicadorInternoSistema = indicadorInternoSistema;
    }
}
