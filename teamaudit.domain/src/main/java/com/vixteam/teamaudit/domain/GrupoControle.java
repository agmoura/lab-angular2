
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


/**
 * Tipo Controle Risco do Objetivo da Unidade Audit�vel
 * 
 */
@Entity
@Table(name = "TCRAT")
public class GrupoControle implements IEntity<String>
{
    @Id
    @Column(name = "CD_TCRAT")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Size(max = 30)
    @Column(name = "NM_TCRAT", length = 30, nullable = false)
    private String nome;

    @NotNull
    @Size(max = 100)
    @Column(name = "DS_TCRAT", length = 100, nullable = false)
    private String descricao;

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
}
