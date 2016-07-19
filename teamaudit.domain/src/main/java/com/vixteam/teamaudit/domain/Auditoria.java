
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import com.vixteam.teamaudit.domain.enums.SimNaoEnum;
import com.vixteam.teamaudit.domain.enums.SimNaoEnumConverter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;


/**
 * Auditoria
 * 
 */
@Entity
@Table(name = "AUDT")
public class Auditoria implements IEntity<String>
{
    @Id
    @Column(name = "CD_AUDT", length = 32, columnDefinition = "CHAR(32)")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_UOAUD", columnDefinition = "CHAR(32)", nullable = false)
    private UnidadeOrganizacional unidadeOrganizacional;

    @NotNull
    @Column(name = "NO_AUDT", nullable = false)
    private Float numeroAuditoria;

    @Size(max = 30)
    @Column(name = "DS_AUDT", length = 30)
    private String descricao;

    @Column(name = "DS_AUDT_CONCS")
    private String descricaoConclusao;

    @ManyToOne
    @JoinColumn(name = "CD_ORATA", columnDefinition = "CHAR(32)")
    private OrigemAtividade origemAtividade;

    /* TODO rodrigo.pimenta entidade CategoriaAuditoria */
    @Column(name = "CD_CTAUD", columnDefinition = "CHAR(32)", length = 32)
    private String categoriaAuditoria;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_AUDT_PREVS_INI")
    private Date dataPrevistaInicio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_AUDT_PREVS_FIM")
    private Date dataPrevistaFim;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_AUDT_EFE_INI")
    private Date dataEfetivaInicio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_AUDT_EFE_FIM")
    private Date dataEfetivaFim;

    @Size(max = 50)
    @Column(name = "DS_AUDT_LOCAL", length = 50)
    private String descricaoLocal;

    /* TODO rodrigo.pimenta Implementar entidade TipoStatus*/
    @Column(name = "CD_TPSTA", columnDefinition = "CHAR(32)", length = 32)
    private String tipoStatus;

    @Column(name = "VL_AUDT_NOTA")
    private Float notaAuditoria;

    @NotNull
    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name = "ID_AUDT_GER_REL_RDA", nullable = false)
    private SimNaoEnum gerarRelatorioRDA;

    @NotNull
    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name = "ID_AUDT_GER_REL_RAI", nullable = false)
    private SimNaoEnum gerarRelatorioRAI;

    @Column(name = "DS_AUDT_INTRD")
    private String descricaoIntroducao;

    @Column(name = "DS_AUDT_OBJT")
    private String descricaoObjetivo;

    @Column(name = "DS_AUDT_ESCPO")
    private String descricaoEscopo;

    @Size(max = 150)
    @Column(name = "DS_AUDT_COMPL", length = 150)
    private String descricaoComplementar;

    @Temporal(TemporalType.DATE)
    @Column(name = "DT_ENV_MAIL_CSA")
    private Date dataEnvioEmailCSA;

    /* TODO rodrigo.pimenta Entidade Especialista */
    @Column(name = "CD_ESAUD_APROV", columnDefinition = "CHAR(32)", length = 32)
    private String especialistaAprovacao;

    @Temporal(TemporalType.DATE)
    @Column(name = "DT_AUDT_APROV")
    private Date dataAprovacao;

    @NotNull
    @Convert(converter = SimNaoEnumConverter.class)
    @Column(name = "ID_APROV_AUDT", length = 1, nullable = false)
    private SimNaoEnum identificadorAprovacao;

    @Column(name = "DS_AUDT_APRES")
    private String descricaoApresentacao;

    @Size(max = 32)
    @Column(name = "CD_TPFOR", length = 32)
    private String tipoFormula;

    @Column(name = "NO_AUDT_ENCR")
    private Integer numeroEncerramento;

    @Column(name = "NO_AUDT_ANO_ENCR")
    private Integer anoEncerramento;

    @Column(name = "NO_AUDT_MES_ENCR")
    private Integer mesEncerramento;

/*
    @Column(name = "PLAAT.NO_PLAAT_ANO")
    private String plaat.numeroPlaatAno;

    @Column(name = "PLAAT.NO_PLAAT_VERS")
    private String plaat.numeroPlaatVers;
*/

    /* Getters and Setters */

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public UnidadeOrganizacional getUnidadeOrganizacional() {
        return unidadeOrganizacional;
    }

    public void setUnidadeOrganizacional(UnidadeOrganizacional unidadeOrganizacional) {
        this.unidadeOrganizacional = unidadeOrganizacional;
    }

    public Float getNumeroAuditoria() {
        return numeroAuditoria;
    }

    public void setNumeroAuditoria(Float numeroAuditoria) {
        this.numeroAuditoria = numeroAuditoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricaoConclusao() {
        return descricaoConclusao;
    }

    public void setDescricaoConclusao(String descricaoConclusao) {
        this.descricaoConclusao = descricaoConclusao;
    }

    public OrigemAtividade getOrigemAtividade() {
        return origemAtividade;
    }

    public void setOrigemAtividade(OrigemAtividade origemAtividade) {
        this.origemAtividade = origemAtividade;
    }

    public String getCategoriaAuditoria() {
        return categoriaAuditoria;
    }

    public void setCategoriaAuditoria(String categoriaAuditoria) {
        this.categoriaAuditoria = categoriaAuditoria;
    }

    public Date getDataPrevistaInicio() {
        return dataPrevistaInicio;
    }

    public void setDataPrevistaInicio(Date dataPrevistaInicio) {
        this.dataPrevistaInicio = dataPrevistaInicio;
    }

    public Date getDataPrevistaFim() {
        return dataPrevistaFim;
    }

    public void setDataPrevistaFim(Date dataPrevistaFim) {
        this.dataPrevistaFim = dataPrevistaFim;
    }

    public Date getDataEfetivaInicio() {
        return dataEfetivaInicio;
    }

    public void setDataEfetivaInicio(Date dataEfetivaInicio) {
        this.dataEfetivaInicio = dataEfetivaInicio;
    }

    public Date getDataEfetivaFim() {
        return dataEfetivaFim;
    }

    public void setDataEfetivaFim(Date dataEfetivaFim) {
        this.dataEfetivaFim = dataEfetivaFim;
    }

    public String getDescricaoLocal() {
        return descricaoLocal;
    }

    public void setDescricaoLocal(String descricaoLocal) {
        this.descricaoLocal = descricaoLocal;
    }

    public String getTipoStatus() {
        return tipoStatus;
    }

    public void setTipoStatus(String tipoStatus) {
        this.tipoStatus = tipoStatus;
    }

    public Float getNotaAuditoria() {
        return notaAuditoria;
    }

    public void setNotaAuditoria(Float notaAuditoria) {
        this.notaAuditoria = notaAuditoria;
    }

    public SimNaoEnum getGerarRelatorioRDA() {
        return gerarRelatorioRDA;
    }

    public void setGerarRelatorioRDA(SimNaoEnum gerarRelatorioRDA) {
        this.gerarRelatorioRDA = gerarRelatorioRDA;
    }

    public SimNaoEnum getGerarRelatorioRAI() {
        return gerarRelatorioRAI;
    }

    public void setGerarRelatorioRAI(SimNaoEnum gerarRelatorioRAI) {
        this.gerarRelatorioRAI = gerarRelatorioRAI;
    }

    public String getDescricaoIntroducao() {
        return descricaoIntroducao;
    }

    public void setDescricaoIntroducao(String descricaoIntroducao) {
        this.descricaoIntroducao = descricaoIntroducao;
    }

    public String getDescricaoObjetivo() {
        return descricaoObjetivo;
    }

    public void setDescricaoObjetivo(String descricaoObjetivo) {
        this.descricaoObjetivo = descricaoObjetivo;
    }

    public String getDescricaoEscopo() {
        return descricaoEscopo;
    }

    public void setDescricaoEscopo(String descricaoEscopo) {
        this.descricaoEscopo = descricaoEscopo;
    }

    public String getDescricaoComplementar() {
        return descricaoComplementar;
    }

    public void setDescricaoComplementar(String descricaoComplementar) {
        this.descricaoComplementar = descricaoComplementar;
    }

    public Date getDataEnvioEmailCSA() {
        return dataEnvioEmailCSA;
    }

    public void setDataEnvioEmailCSA(Date dataEnvioEmailCSA) {
        this.dataEnvioEmailCSA = dataEnvioEmailCSA;
    }

    public String getEspecialistaAprovacao() {
        return especialistaAprovacao;
    }

    public void setEspecialistaAprovacao(String especialistaAprovacao) {
        this.especialistaAprovacao = especialistaAprovacao;
    }

    public Date getDataAprovacao() {
        return dataAprovacao;
    }

    public void setDataAprovacao(Date dataAprovacao) {
        this.dataAprovacao = dataAprovacao;
    }

    public SimNaoEnum getIdentificadorAprovacao() {
        return identificadorAprovacao;
    }

    public void setIdentificadorAprovacao(SimNaoEnum identificadorAprovacao) {
        this.identificadorAprovacao = identificadorAprovacao;
    }

    public String getDescricaoApresentacao() {
        return descricaoApresentacao;
    }

    public void setDescricaoApresentacao(String descricaoApresentacao) {
        this.descricaoApresentacao = descricaoApresentacao;
    }

    public String getTipoFormula() {
        return tipoFormula;
    }

    public void setTipoFormula(String tipoFormula) {
        this.tipoFormula = tipoFormula;
    }

    public Integer getNumeroEncerramento() {
        return numeroEncerramento;
    }

    public void setNumeroEncerramento(Integer numeroEncerramento) {
        this.numeroEncerramento = numeroEncerramento;
    }

    public Integer getAnoEncerramento() {
        return anoEncerramento;
    }

    public void setAnoEncerramento(Integer anoEncerramento) {
        this.anoEncerramento = anoEncerramento;
    }

    public Integer getMesEncerramento() {
        return mesEncerramento;
    }

    public void setMesEncerramento(Integer mesEncerramento) {
        this.mesEncerramento = mesEncerramento;
    }
}
