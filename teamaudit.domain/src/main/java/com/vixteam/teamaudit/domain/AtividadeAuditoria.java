
package com.vixteam.teamaudit.domain;

import com.vixteam.framework.domain.IEntity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


/**
 * AtividadeAuditoria da Auditoria
 */
@Entity
@Table(name = "ATADT")
public class AtividadeAuditoria
        implements IEntity<String> {

    @Id
    @Column(name = "CD_ATADT", columnDefinition = "CHAR(32)", length = 32)
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CD_AUDT", columnDefinition = "CHAR(32)", nullable = false)
    private Auditoria auditoria;

    @NotNull
    @OneToOne
    @JoinColumn(name = "CD_APLAA", nullable = false)
    private AtividadePlano atividadePlano;

    @Column(name = "VL_ATADT_NOTA")
    private Float notaAtividade;

    @NotNull
    @Column(name = "ID_BLOQ", columnDefinition = "CHAR(1)", length = 1)
    private String idBloq;

    /* Getters and Setters */
    public String getNome() {
        String nome = "";
        Integer planoAnualAuditoria = null;
        Integer versaoPlanoAnual = null;
        if (this.atividadePlano != null) {
           if (this.atividadePlano.getPlanoAnual() != null) {
               planoAnualAuditoria = this.atividadePlano.getPlanoAnual().getNumero();
               versaoPlanoAnual = this.atividadePlano.getPlanoAnual().getVersao();
           }
        }

        if (planoAnualAuditoria == null || versaoPlanoAnual == null) {
            nome = "Erro ao criar nome de auditoria!";
        } else {
            nome += planoAnualAuditoria + " / " + versaoPlanoAnual;
        }
        return nome;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public Auditoria getAuditoria() {
        return auditoria;
    }

    public void setAuditoria(Auditoria codigoAuditoria) {
        this.auditoria = codigoAuditoria;
    }

    public AtividadePlano getAtividadePlano() {
        return atividadePlano;
    }

    public void setAtividadePlano(AtividadePlano atividadePlano) {
        this.atividadePlano = atividadePlano;
    }

    public Float getNotaAtividade() {
        return notaAtividade;
    }

    public void setNotaAtividade(Float valorNotaAtividadeAuditoria) {
        this.notaAtividade = valorNotaAtividadeAuditoria;
    }

    public String getIdBloq() {
        return idBloq;
    }

    public void setIdBloq(String idBloq) {
        this.idBloq = idBloq;
    }
}
