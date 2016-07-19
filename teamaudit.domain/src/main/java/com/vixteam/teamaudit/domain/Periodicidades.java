package com.vixteam.teamaudit.domain;


import com.vixteam.framework.domain.IEntity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "PERCT")
public class Periodicidades implements IEntity<String> {

    @Id
    @Column(name = "CD_PERCT")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Column(name = "NM_PERCT", nullable = false)
    private String nome;

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
}
