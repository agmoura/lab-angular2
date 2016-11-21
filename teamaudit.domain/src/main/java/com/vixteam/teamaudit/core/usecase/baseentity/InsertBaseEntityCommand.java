package com.vixteam.teamaudit.core.usecase.baseentity;

import com.vixteam.teamaudit.core.domain.baseentity.BaseEntity;
import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;
import com.vixteam.teamaudit.core.domain.commons.IEntity;
import com.vixteam.teamaudit.core.usecase.commons.UseCase;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;

public class InsertBaseEntityCommand extends UseCase<BaseEntity> {
    private BaseEntity entity;

    @Autowired
    private IEntityRepository repository;

    public InsertBaseEntityCommand() { }

    public InsertBaseEntityCommand(BaseEntity entity) {
        setEntity(entity);
    }

    public BaseEntity getEntity() {
        return entity;
    }

    public void setEntity(BaseEntity entity) {
        this.entity = entity;
    }

    @Override
    protected BaseEntity execute() throws Exception {
        return repository.save(getEntity());
    }
}
