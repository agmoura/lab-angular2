package com.vixteam.teamaudit.core.domain.baseentity;

import java.util.UUID;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import com.vixteam.teamaudit.core.domain.commons.IEntity;

@MappedSuperclass
public abstract class BaseEntity implements IEntity<String> {

    @Id
    protected String id;

    public BaseEntity() {

    }

    public BaseEntity(String id) {
        setId(id);
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String getId() {
        return this.id;
    }

    @PrePersist
    private void setNewId(){
        if(this.id == null)
            this.id = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
    }
}