package com.vixteam.teamaudit.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;

import com.vixteam.framework.domain.IEntity;


@Entity
@Table (name="ESCPO")
public class Escopo implements IEntity<String> {

    @Id
    @GeneratedValue
	@Column(name="CD_ESCPO" ,length=32, columnDefinition = "CHAR(32)") 
    private String id;

    @NotNull
    @Size(max = 60)
    @Column(name="NM_ESCPO", length=60 , nullable=false)
    private String nome; 

    @NotNull
    @Size(max = 255)
    @Column(name="DS_ESCPO"  , length=255, nullable=false)
    private String descricao; 

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