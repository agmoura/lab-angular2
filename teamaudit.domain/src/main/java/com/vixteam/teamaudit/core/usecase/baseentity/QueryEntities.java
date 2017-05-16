package com.vixteam.teamaudit.core.usecase.baseentity;

import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;
import com.vixteam.teamaudit.core.domain.commons.IEntity;
import com.vixteam.teamaudit.core.usecase.commons.EntityQuery;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.usecase.commons.UseCase;
import javax.inject.Inject;

public class QueryEntities<TEntity extends IEntity> extends UseCase<PagedList<Object[]>> {
    private Class<TEntity> entityClass;
    private EntityQuery entityQuery;

    @Inject
    private IEntityRepository<TEntity> repository;

    public QueryEntities(Class<TEntity> entityClass, EntityQuery entityQuery) {
        this.entityClass = entityClass;
        this.entityQuery = entityQuery;
    }

    @Override
    protected PagedList<Object[]> execute() throws Exception {
        return repository.query(this.entityClass, this.entityQuery);
    }
}
