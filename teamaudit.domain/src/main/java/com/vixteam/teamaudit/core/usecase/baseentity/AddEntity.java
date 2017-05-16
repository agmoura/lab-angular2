package com.vixteam.teamaudit.core.usecase.baseentity;

import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;
import com.vixteam.teamaudit.core.domain.commons.IEntity;
import com.vixteam.teamaudit.core.usecase.commons.UseCase;
import javax.inject.Inject;

public class AddEntity<TEntity extends IEntity> extends UseCase<TEntity> {
    private TEntity entity;

    @Inject
    private IEntityRepository<TEntity> repository;

    public AddEntity() { }

    public AddEntity(TEntity entity) {
        setEntity(entity);
    }

    public TEntity getEntity() {
        return entity;
    }

    public void setEntity(TEntity entity) {
        this.entity = entity;
    }

    @Override
    protected TEntity execute() throws Exception {
        return repository.save(getEntity());
    }
}
