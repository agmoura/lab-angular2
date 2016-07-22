package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import com.vixteam.teamaudit.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.domain.enums.SimNaoEnumConverter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;


/**
 * Controle Empresa
 */
@Entity
@Table(name = "CTREM")
public class ControlePadrao implements IEntity<String> {
    @Id
    @Column(name = "CD_CTREM")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Size(max = 60)
    @Column(name = "NM_CTREM", length = 60, nullable = false)
    private String nome;

    @Size(max = 1500)
    @Column(name = "DS_CTREM", length = 1500)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "CD_UOAUD", columnDefinition = "CHAR(32)")
    private UnidadeOrganizacional unidadeOrganizacional;

    @ManyToOne
    @JoinColumn(name = "CD_TPNAC", columnDefinition = "CHAR(32)")
    private TipoNaturezaControle tipoNaturezaControle;

    @ManyToOne
    @JoinColumn(name = "CD_TPOCR", columnDefinition = "CHAR(32)")
    private TipoOrigemControle tipoOrigemControle;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_CATCT", columnDefinition = "CHAR(32)", nullable = false)
    private PropostaControle propostaControle;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_PERCT_EXEC", columnDefinition = "CHAR(32)", nullable = false)
    private Periodicidades frequenciaExecucao;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_PERCT_REV", columnDefinition = "CHAR(32)", nullable = false)
    private Periodicidades frequenciaRevisao;

    @ManyToOne
    @JoinColumn(name = "CD_TCRAT", columnDefinition = "CHAR(32)")
    private GrupoControle grupoControle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CD_CTGCT", columnDefinition = "CHAR(32)")
    private CategoriaControle categoriaControle;

    @NotNull
    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name = "ID_CTREM_CHAVE", nullable = false)
    private SimNaoEnum controleChave;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_TPCRL", columnDefinition = "CHAR(32)", nullable = false)
    private TipoControle tipoControle;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_ESCPO", columnDefinition = "CHAR(32)", nullable = false)
    private Escopo escopo;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "CATEC", joinColumns = {@JoinColumn(name = "CD_CTREM")}, inverseJoinColumns = {@JoinColumn(name = "CD_TPECR")})
    private List<TipoEspecialControle> listaTipoEspecialControle;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "OBJAC", joinColumns = {@JoinColumn(name = "CD_CTREM")}, inverseJoinColumns = {@JoinColumn(name = "CD_OBACR")})
    private List<ObjetivoAuditoria> listaObjetivoAuditoria;

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

    public TipoNaturezaControle getTipoNaturezaControle() {
        return tipoNaturezaControle;
    }

    public void setTipoNaturezaControle(TipoNaturezaControle tipoNaturezaControle) {
        this.tipoNaturezaControle = tipoNaturezaControle;
    }

    public TipoOrigemControle getTipoOrigemControle() {
        return tipoOrigemControle;
    }

    public void setTipoOrigemControle(TipoOrigemControle tipoOrigemControle) {
        this.tipoOrigemControle = tipoOrigemControle;
    }

    public PropostaControle getPropostaControle() {
        return propostaControle;
    }

    public void setPropostaControle(PropostaControle propostaControle) {
        this.propostaControle = propostaControle;
    }

    public Periodicidades getFrequenciaExecucao() {
        return frequenciaExecucao;
    }

    public void setFrequenciaExecucao(Periodicidades frequenciaExecucao) {
        this.frequenciaExecucao = frequenciaExecucao;
    }

    public Periodicidades getFrequenciaRevisao() {
        return frequenciaRevisao;
    }

    public void setFrequenciaRevisao(Periodicidades frequenciaRevisao) {
        this.frequenciaRevisao = frequenciaRevisao;
    }

    public GrupoControle getGrupoControle() {
        return grupoControle;
    }

    public void setGrupoControle(GrupoControle grupoControle) {
        this.grupoControle = grupoControle;
    }

    public CategoriaControle getCategoriaControle() {
        return categoriaControle;
    }

    public void setCategoriaControle(CategoriaControle categoriaControle) {
        this.categoriaControle = categoriaControle;
    }

    public SimNaoEnum getControleChave() {
        return controleChave;
    }

    public void setControleChave(SimNaoEnum controleChave) {
        this.controleChave = controleChave;
    }

    public TipoControle getTipoControle() {
        return tipoControle;
    }

    public void setTipoControle(TipoControle tipoControle) {
        this.tipoControle = tipoControle;
    }

    public Escopo getEscopo() {
        return escopo;
    }

    public void setEscopo(Escopo escopo) {
        this.escopo = escopo;
    }

    public List<TipoEspecialControle> getListaTipoEspecialControle() {
        return listaTipoEspecialControle;
    }

    public void setListaTipoEspecialControle(List<TipoEspecialControle> listaTipoEspecialControle) {
        this.listaTipoEspecialControle = listaTipoEspecialControle;
    }

    public List<ObjetivoAuditoria> getListaObjetivoAuditoria() {
        return listaObjetivoAuditoria;
    }

    public void setListaObjetivoAuditoria(List<ObjetivoAuditoria> listaObjetivoAuditoria) {
        this.listaObjetivoAuditoria = listaObjetivoAuditoria;
    }
}
