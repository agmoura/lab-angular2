package com.vixteam.teamaudit.core.usecase.baseentity;

import com.vixteam.teamaudit.core.domain.commons.IEntity;
import com.vixteam.teamaudit.core.usecase.commons.UseCase;
import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;

import javax.inject.Inject;
import java.io.Serializable;

public class GetEntity<TEntity extends IEntity> extends UseCase<TEntity> {
    private Class<TEntity> entityClass;
    private Serializable id;

    @Inject
    private IEntityRepository<TEntity> repository;

    public GetEntity(Class<TEntity> entityClass, Serializable id) {
        this.entityClass = entityClass;
        this.id = id;
    }

    @Override
    protected TEntity execute() throws Exception {
        return repository.get(this.entityClass, this.id);
    }
}
