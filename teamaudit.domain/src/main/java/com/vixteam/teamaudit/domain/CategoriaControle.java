
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


/**
 * Categoria do Controle
 * 
 */
@Entity
@Table(name = "CTGCT")
public class CategoriaControle implements IEntity<String>
{

    @Id
    @Column(name = "CD_CTGCT")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_ESCPO", nullable = false)
    private Escopo escopo;

    @NotNull
    @Size(max = 100)
    @Column(name = "NM_CTGCT", length = 100, nullable = false)
    private String nome;

    @Size(max = 255)
    @Column(name = "DS_CTGCT")
    private String descricao;

    @NotNull
    @Column(name = "ID_CTGCT_INTR_SIST", nullable = false)
    private String indicadorInternoSistema;

    /* Getters and Setters */

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public Escopo getEscopo() {
        return escopo;
    }

    public void setEscopo(Escopo escopo) {
        this.escopo = escopo;
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

    public String getIndicadorInternoSistema() {
        return indicadorInternoSistema;
    }

    public void setIndicadorInternoSistema(String indicadorInternoSistema) {
        this.indicadorInternoSistema = indicadorInternoSistema;
    }
}
