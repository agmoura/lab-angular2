
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;


/**
 * RiscoPadrao
 */
@Entity
@Table(name = "RISEM")
public class RiscoPadrao implements IEntity<String> {
    @Id
    @Column(name = "CD_RISEM", columnDefinition = "CHAR(32)", length = 32)
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Size(max = 60)
    @Column(name = "NM_RISEM", length = 60, nullable = false)
    private String nome;

    @Size(max = 1500)
    @Column(name = "DS_RISEM", length = 1500)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "CD_UOAUD", columnDefinition = "CHAR(32)")
    private UnidadeOrganizacional unidadeOrganizacional;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_ORGRI", columnDefinition = "CHAR(32)", nullable = false)
    private OrigemRisco origemRisco;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_CATRI", columnDefinition = "CHAR(32)", nullable = false)
    private CategoriaRisco categoriaRisco;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_ESCPO", columnDefinition = "CHAR(32)", nullable = false)
    private Escopo escopo;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name="OBJAR", joinColumns = {
        @JoinColumn(name = "CD_RISEM")
    },
    inverseJoinColumns = {
        @JoinColumn(name = "CD_OBACR")
    })
    List<ObjetivoAuditoria> listaObjetivoAuditoria;

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

    public UnidadeOrganizacional getUnidadeOrganizacional() {
        return unidadeOrganizacional;
    }

    public void setUnidadeOrganizacional(UnidadeOrganizacional unidadeOrganizacional) {
        this.unidadeOrganizacional = unidadeOrganizacional;
    }

    public OrigemRisco getOrigemRisco() {
        return origemRisco;
    }

    public void setOrigemRisco(OrigemRisco origemRisco) {
        this.origemRisco = origemRisco;
    }

    public CategoriaRisco getCategoriaRisco() {
        return categoriaRisco;
    }

    public void setCategoriaRisco(CategoriaRisco categoriaRisco) {
        this.categoriaRisco = categoriaRisco;
    }

    public Escopo getEscopo() {
        return escopo;
    }

    public void setEscopo(Escopo escopo) {
        this.escopo = escopo;
    }

    public List<ObjetivoAuditoria> getListaObjetivoAuditoria() {
        return listaObjetivoAuditoria;
    }

    public void setListaObjetivoAuditoria(List<ObjetivoAuditoria> listaObjetivoAuditoria) {
        this.listaObjetivoAuditoria = listaObjetivoAuditoria;
    }
}
