package com.vixteam.teamaudit.domain;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.vixteam.teamaudit.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.domain.enums.SimNaoEnumConverter;
import org.hibernate.annotations.GenericGenerator;
import com.vixteam.framework.domain.IEntity;
import java.util.List;


@Entity
@Table (name="CATOB")
public class CategoriaObjetivo implements IEntity<String> {

	@Id 
	@Column(name="CD_CATOB" ,length=32, columnDefinition = "CHAR(32)") 
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @ManyToOne
    @JoinColumn(name="CD_ESCPO", nullable=false)
    private Escopo escopo;  
	
    @NotNull
    @Size(max = 100)
    @Column(name="NM_CATOB", length=100, nullable=false)
    private String nome;

    @NotNull
    @Size(max = 255)
    @Column(name="DS_CATOB", length=255)
    private String descricao;

    @NotNull
    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name="ID_CATOB_INTR_SIST", length=1, nullable=false)
    private SimNaoEnum indicadorInternoSistema;

    @Valid
    @OneToMany(mappedBy = "categoriaObjetivo")
    private List<Objetivo> objetivos;

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public Escopo getEscopo () {
    	return escopo;
    }
	
    public void setEscopo (Escopo escopo) {
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

    public SimNaoEnum getIndicadorInternoSistema() {
        return indicadorInternoSistema;
    }

    public void setIndicadorInternoSistema(SimNaoEnum indicadorInternoSistema) {
        this.indicadorInternoSistema = indicadorInternoSistema;
    }

    public List<Objetivo> getObjetivos() {
        return objetivos;
    }

    public void setObjetivos(List<Objetivo> objetivos) {
        this.objetivos = objetivos;
    }
}
