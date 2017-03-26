package com.vixteam.teamaudit.core.domain;

import com.vixteam.teamaudit.core.domain.baseentity.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
public class AuditLog extends BaseEntity {

    @NotNull
    @Column
    private String entityName;

    @NotNull
    @Column
    private String entityId;

    @NotNull
    @Column
    private OperationEnum operation;

    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    @Column
    private Date dateCreated;

    @NotNull
    @Column
    private String user;

    @OneToMany(mappedBy = "auditLog", cascade = CascadeType.ALL)
    private List<AuditLogItem> items;

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public OperationEnum getOperation() {
        return operation;
    }

    public void setOperation(OperationEnum operation) {
        this.operation = operation;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public List<AuditLogItem> getItems() {
        return items;
    }

    public void setItems(List<AuditLogItem> items) {
        this.items = items;
    }
}
