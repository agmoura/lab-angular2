package com.vixteam.teamaudit.domain;

import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;
import com.vixteam.framework.domain.IEntity;


@Entity
@Table(name = "UOAUD")
public class UnidadeOrganizacional implements IEntity<String> {

    @Id
    @Column(name = "CD_UOAUD", length = 32, columnDefinition = "CHAR(32)")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

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