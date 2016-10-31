package com.vixteam.teamaudit.repositories;

import com.vixteam.framework.common.support.EntityQuery;
import com.vixteam.framework.common.support.PagedList;
import com.vixteam.framework.domain.IEntity;

import java.io.Serializable;
import java.util.List;

public interface IEntityRepository {
    PagedList find(EntityQuery entityQuery);

    <TEntity extends IEntity> List<TEntity> findList(EntityQuery entityQuery);

    Object get(String entityPath, Serializable id) throws ClassNotFoundException;

    <TEntity extends IEntity> TEntity save(TEntity entity);

    void delete(String entityPath, Serializable id) throws ClassNotFoundException;

}
