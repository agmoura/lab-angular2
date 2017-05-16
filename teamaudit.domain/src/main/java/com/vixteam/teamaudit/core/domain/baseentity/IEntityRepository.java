package com.vixteam.teamaudit.core.domain.baseentity;

import com.vixteam.teamaudit.core.usecase.commons.EntityQuery;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.domain.commons.IEntity;

import java.io.Serializable;

public interface IEntityRepository<TEntity extends IEntity> {

    PagedList<Object[]> query(Class<TEntity> entityClass, EntityQuery entityQuery);

    TEntity get(Class<TEntity> entityClass, Serializable id);

    TEntity save(TEntity entity);

    void delete(Class<TEntity> entityClass, Serializable id);
}
