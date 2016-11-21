package com.vixteam.teamaudit.core.domain.baseentity;

import com.vixteam.teamaudit.core.usecase.baseentity.EntityQuery;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.domain.commons.IEntity;

import java.io.Serializable;

public interface IEntityRepository {
    PagedList find(EntityQuery entityQuery);

    Object get(String entityPath, Serializable id) throws ClassNotFoundException;

    <TEntity extends IEntity> TEntity save(TEntity entity);

    void delete(String entityPath, Serializable id) throws ClassNotFoundException;

}
