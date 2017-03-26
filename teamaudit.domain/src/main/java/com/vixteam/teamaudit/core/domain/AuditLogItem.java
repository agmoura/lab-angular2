package com.vixteam.teamaudit.core.domain;

import com.vixteam.teamaudit.core.domain.baseentity.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
public class AuditLogItem extends BaseEntity {

    @NotNull
    @Column
    private String field;

    @Column
    private String oldValue;

    @Column
    private String newValue;

    @ManyToOne
    private AuditLog auditLog;

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getOldValue() {
        return oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public AuditLog getAuditLog() {
        return auditLog;
    }

    public void setAuditLog(AuditLog auditLog) {
        this.auditLog = auditLog;
    }
}
