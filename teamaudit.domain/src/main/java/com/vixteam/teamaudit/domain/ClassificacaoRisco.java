
package com.vixteam.teamaudit.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


/**
 * Camada de Classificação de RiscoPadrao
 */
@Entity
@Table(name = "CCRSC")
@AttributeOverride(name="id", column=@Column(name = "CD_CCRSC", columnDefinition = "CHAR(32)"))
public class ClassificacaoRisco extends BaseEntity {

    @NotNull
    @Size(max = 60)
    @Column(name = "NM_CCRSC", length = 60, nullable = false)
    private String nome;

    @NotNull
    @Size(max = 255)
    @Column(name = "DS_CCRSC", length = 255, nullable = false)
    private String descricao;

    @NotNull
    @Column(name = "NO_CCRSC_NIVEL", nullable = false)
    private Integer numeroNivel;

    /* Getters and Setters */
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

    public Integer getNumeroNivel() {
        return numeroNivel;
    }

    public void setNumeroNivel(Integer numeroNivel) {
        this.numeroNivel = numeroNivel;
    }
}
