package com.vixteam.teamaudit.core.domain;

import com.vixteam.teamaudit.core.domain.baseentity.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "UOAUD")
@AttributeOverride(name="id", column=@Column(name = "CD_UOAUD", columnDefinition = "CHAR(32)"))
public class UnidadeOrganizacional extends BaseEntity {

    @NotNull
    @Size(max = 50)
    @Column(name = "NM_UOAUD", length = 50, nullable = false)
    private String nome;

    /*@OneToMany(mappedBy = "unidadeOrganizacional")
    private List<Objetivo> objetivos;

    @OneToMany(mappedBy = "unidadeOrganizacional")
    private List<RiscoPadrao> riscos;

    @OneToMany(mappedBy = "unidadeOrganizacional")
    private List<Estrutura> estruturas;

    @OneToMany(mappedBy = "unidadeOrganizacional")
    private List<VisaoAuditavel> visoes;*/

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    /*public List<Objetivo> getObjetivos() {
        return objetivos;
    }

    public void setObjetivos(List<Objetivo> objetivos) {
        this.objetivos = objetivos;
    }

    public List<RiscoPadrao> getRiscos() {
        return riscos;
    }

    public void setRiscos(List<RiscoPadrao> riscos) {
        this.riscos = riscos;
    }

    public List<Estrutura> getEstruturas() {
        return estruturas;
    }

    public void setEstruturas(List<Estrutura> estruturas) {
        this.estruturas = estruturas;
    }

    public List<VisaoAuditavel> getVisoes() {
        return visoes;
    }

    public void setVisoes(List<VisaoAuditavel> visoes) {
        this.visoes = visoes;
    }*/
}