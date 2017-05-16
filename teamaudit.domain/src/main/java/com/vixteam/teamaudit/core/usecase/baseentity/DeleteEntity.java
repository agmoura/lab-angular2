package com.vixteam.teamaudit.core.usecase.baseentity;

import com.vixteam.teamaudit.core.domain.commons.IEntity;
import com.vixteam.teamaudit.core.usecase.commons.UseCase;
import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;

import javax.inject.Inject;
import java.io.Serializable;

public class DeleteEntity<TEntity extends IEntity> extends UseCase<Void> {
    private Class<TEntity> entityClass;
    private Serializable id;

    @Inject
    private IEntityRepository<TEntity> repository;

    public DeleteEntity(Class<TEntity> entityClass, Serializable id) {
        this.entityClass = entityClass;
        this.id = id;
    }

    @Override
    protected Void execute() throws Exception {
        repository.delete(this.entityClass, this.id);
        return null;
    }
}
