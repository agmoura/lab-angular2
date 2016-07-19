
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import com.vixteam.teamaudit.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.domain.enums.SimNaoEnumConverter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;


/**
 * Atividade do Plano Anual de Auditoria
 */
@Entity
@Table(name = "APLAA")
public class AtividadePlano
        implements IEntity<String> {

    @Id
    @Column(name = "CD_APLAA", columnDefinition = "CHAR(32)", length = 32)
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @Size(max = 2000)
    @Column(name = "DS_APLAA", length = 2000, nullable = false)
    private String descricao; //descricao

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_PLAAT", nullable = false)
    private PlanoAnual planoAnual;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_CVAUD", nullable = false)
    private Composicao composicao;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_ORATA", nullable = false)
    private OrigemAtividade origemAtividade;

    @ManyToOne
    @JoinColumn(name = "CD_TPAUD", columnDefinition = "CHAR(32)")
    private TipoAuditoria tipoAuditoria;

    @Size(max = 255)
    @Column(name = "DS_APLAA_OBJT", length = 255)
    private String descricaoObjetivo;

    @NotNull
    @Column(name = "QT_APLAA_HR", nullable = false)
    private Float quantidadeHoras;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_APLAA_PREVS_INI")
    private Date dataPrevistaInicio;

    // TODO: rodrigo.pimenta - Criar entidade AtividadeCarteiraAuditoria
    @Column(name = "CD_ATCAT", columnDefinition = "CHAR(32)", length = 32)
    private String atividadeCarteira;

    @NotNull
    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name = "ID_APLAA_ANDTO", length = 1, nullable = false)
    private SimNaoEnum atividadeEmAndamento = SimNaoEnum.Nao;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_APLAA_CAN")
    private Date dataCancelamento;

    // TODO: rodrigo.pimenta - associar com a entidade especialista
    @Column(name = "CD_ESAUD_CAN", columnDefinition = "CHAR(32)", length = 32)
    private String usuarioCancelamento;

    @Size(max = 255)
    @Column(name = "DS_APLAA_MOT_CAN", length = 255)
    private String motivoCancelamento;

    @NotNull
    @Column(name = "QT_APLAA_HR_TER", nullable = false)
    private Float horasTerceiros;

    @NotNull
    @Column(name = "QT_APLAA_HR_PROP", nullable = false)
    private Float horasProprias;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_APLAA_PREVS_FIM")
    private Date dataPrevistaFim;

    @ManyToOne
    @JoinColumn(name = "CD_SAPAA", columnDefinition = "CHAR(32)")
    private SituacaoAtividadePlano situacaoAtividadePlano;

    @ManyToOne
    @JoinColumn(name = "CD_TPAPA", columnDefinition = "CHAR(32)")
    private TipoAtividadePlano tipoAtividadePlano;

    @NotNull
    @Size(max = 150)
    @Column(name = "DS_APLAA_BREVE", length = 150, nullable = true)
    private String descricaoBreve;

    @Cascade(CascadeType.ALL)
    @ManyToOne
    @JoinColumn(name = "CD_ONDAT")
    private Onda onda;

    @Column(name = "DS_OBJETIVO_RAE")
    private String descricaoObjetivoRae;

    @Column(name = "DS_INTRODUCAO_RAE")
    private String descricaoIntroducaoRae;

    @Column(name = "DS_ESCOPO_RAE")
    private String descricaoEscopoRae;

    @OneToOne
    @JoinColumn(name = "CD_APLAA_ORIG", columnDefinition = "CHAR(32)", nullable = true)
    private AtividadePlano atividadePlanoOrigem;

    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name = "ID_MODIFICADO")
    private SimNaoEnum modificado;

    /* TODO rodrigo.pimenta Implementar entidade ProjetoAdministrativo */
    @Column(name = "CD_PJADM", columnDefinition = "CHAR(32)", length = 32)
    private String projetoAdministrativo;

    @Column(name = "VL_APLAA")
    private String nota;

    @OneToOne(mappedBy = "atividadePlano")
    private AtividadeAuditoria atividadeAuditoria;

    /* Getters and Setters */

    @Override

    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public PlanoAnual getPlanoAnual() {
        return planoAnual;
    }

    public void setPlanoAnual(PlanoAnual planoAnual) {
        this.planoAnual = planoAnual;
    }

    public Composicao getComposicao() {
        return composicao;
    }

    public void setComposicao(Composicao composicao) {
        this.composicao = composicao;
    }

    public OrigemAtividade getOrigemAtividade() {
        return origemAtividade;
    }

    public void setOrigemAtividade(OrigemAtividade origemAtividade) {
        this.origemAtividade = origemAtividade;
    }

    public TipoAuditoria getTipoAuditoria() {
        return tipoAuditoria;
    }

    public void setTipoAuditoria(TipoAuditoria tipoAuditoria) {
        this.tipoAuditoria = tipoAuditoria;
    }

    public String getDescricaoObjetivo() {
        return descricaoObjetivo;
    }

    public void setDescricaoObjetivo(String descricaoObjetivo) {
        this.descricaoObjetivo = descricaoObjetivo;
    }

    public Float getQuantidadeHoras() {
        return quantidadeHoras;
    }

    public void setQuantidadeHoras(Float quantidadeHoras) {
        this.quantidadeHoras = quantidadeHoras;
    }

    public Date getDataPrevistaInicio() {
        return dataPrevistaInicio;
    }

    public void setDataPrevistaInicio(Date dataPrevistaInicio) {
        this.dataPrevistaInicio = dataPrevistaInicio;
    }

    public String getAtividadeCarteira() {
        return atividadeCarteira;
    }

    public void setAtividadeCarteira(String atividadeCarteira) {
        this.atividadeCarteira = atividadeCarteira;
    }

    public SimNaoEnum getAtividadeEmAndamento() {
        return atividadeEmAndamento;
    }

    public void setAtividadeEmAndamento(SimNaoEnum atividadeEmAndamento) {
        this.atividadeEmAndamento = atividadeEmAndamento;
    }

    public Date getDataCancelamento() {
        return dataCancelamento;
    }

    public void setDataCancelamento(Date dataCancelamento) {
        this.dataCancelamento = dataCancelamento;
    }

    public String getUsuarioCancelamento() {
        return usuarioCancelamento;
    }

    public void setUsuarioCancelamento(String usuarioCancelamento) {
        this.usuarioCancelamento = usuarioCancelamento;
    }

    public String getMotivoCancelamento() {
        return motivoCancelamento;
    }

    public void setMotivoCancelamento(String motivoCancelamento) {
        this.motivoCancelamento = motivoCancelamento;
    }

    public Float getHorasTerceiros() {
        return horasTerceiros;
    }

    public void setHorasTerceiros(Float horasTerceiros) {
        this.horasTerceiros = horasTerceiros;
    }

    public Float getHorasProprias() {
        return horasProprias;
    }

    public void setHorasProprias(Float horasProprias) {
        this.horasProprias = horasProprias;
    }

    public Date getDataPrevistaFim() {
        return dataPrevistaFim;
    }

    public void setDataPrevistaFim(Date dataPrevistaFim) {
        this.dataPrevistaFim = dataPrevistaFim;
    }

    public SituacaoAtividadePlano getSituacaoAtividadePlano() {
        return situacaoAtividadePlano;
    }

    public void setSituacaoAtividadePlano(SituacaoAtividadePlano situacaoAtividadePlano) {
        this.situacaoAtividadePlano = situacaoAtividadePlano;
    }

    public TipoAtividadePlano getTipoAtividadePlano() {
        return tipoAtividadePlano;
    }

    public void setTipoAtividadePlano(TipoAtividadePlano tipoAtividadePlano) {
        this.tipoAtividadePlano = tipoAtividadePlano;
    }

    public String getDescricaoBreve() {
        return descricaoBreve;
    }

    public void setDescricaoBreve(String descricaoBreve) {
        this.descricaoBreve = descricaoBreve;
    }

    public Onda getOnda() {
        return onda;
    }

    public void setOnda(Onda onda) {
        this.onda = onda;
    }

    public String getDescricaoObjetivoRae() {
        return descricaoObjetivoRae;
    }

    public void setDescricaoObjetivoRae(String descricaoObjetivoRae) {
        this.descricaoObjetivoRae = descricaoObjetivoRae;
    }

    public String getDescricaoIntroducaoRae() {
        return descricaoIntroducaoRae;
    }

    public void setDescricaoIntroducaoRae(String descricaoIntroducaoRae) {
        this.descricaoIntroducaoRae = descricaoIntroducaoRae;
    }

    public String getDescricaoEscopoRae() {
        return descricaoEscopoRae;
    }

    public void setDescricaoEscopoRae(String descricaoEscopoRae) {
        this.descricaoEscopoRae = descricaoEscopoRae;
    }

    public AtividadePlano getAtividadePlanoOrigem() {
        return atividadePlanoOrigem;
    }

    public void setAtividadePlanoOrigem(AtividadePlano atividadePlanoOrigem) {
        this.atividadePlanoOrigem = atividadePlanoOrigem;
    }

    public SimNaoEnum getModificado() {
        return modificado;
    }

    public void setModificado(SimNaoEnum modificado) {
        this.modificado = modificado;
    }

    public String getProjetoAdministrativo() {
        return projetoAdministrativo;
    }

    public void setProjetoAdministrativo(String projetoAdministrativo) {
        this.projetoAdministrativo = projetoAdministrativo;
    }

    public String getNota() {
        return nota;
    }

    public void setNota(String nota) {
        this.nota = nota;
    }

    public AtividadeAuditoria getAtividadeAuditoria() {
        return atividadeAuditoria;
    }

    public void setAtividadeAuditoria(AtividadeAuditoria atividadeAuditoria) {
        this.atividadeAuditoria = atividadeAuditoria;
    }
}
