
package com.vixteam.teamaudit.domain;
import com.vixteam.framework.domain.IEntity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;


/**
 * Onda da Auditoria
 * 
 */
@Entity
@Table(name = "ONDAT")
public class Onda implements IEntity<String> {

    @Id
    @Column(name = "CD_ONDAT", columnDefinition = "CHAR(32)", length = 32)
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @ManyToOne
    @JoinColumn(name="CD_ESCPO", nullable=false)
    private Escopo escopo;

    @NotNull
    @ManyToOne
    @JoinColumn(name="CD_ORATA", nullable=false)
    private OrigemAtividade origemAtividade;

    @NotNull
    @Size(max = 100)
    @Column(name = "NM_ONDAT", length = 100, nullable = false)
    private String nome;

    @NotNull
    @Size(max = 255)
    @Column(name = "DS_ONDAT", length = 255, nullable = false)
    private String descricao;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_ONDAT_INI")
    private Date dataInicio;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DT_ONDAT_FIM")
    private Date dataFim;

    /* Geters and Setters */

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public Escopo getEscopo() {
        return escopo;
    }

    public void setEscopo(Escopo escopo) {
        this.escopo = escopo;
    }

    public OrigemAtividade getOrigemAtividade() {
        return origemAtividade;
    }

    public void setOrigemAtividade(OrigemAtividade origemAtividade) {
        this.origemAtividade = origemAtividade;
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

    public Date getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(Date dataInicioCoberturaOndaAuditoria) {
        this.dataInicio = dataInicioCoberturaOndaAuditoria;
    }

    public Date getDataFim() {
        return dataFim;
    }

    public void setDataFim(Date dataFimCoberturaOndaAuditoria) {
        this.dataFim = dataFimCoberturaOndaAuditoria;
    }
}
