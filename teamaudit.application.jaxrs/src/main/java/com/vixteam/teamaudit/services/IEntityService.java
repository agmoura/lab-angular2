package com.vixteam.teamaudit.services;

import com.vixteam.framework.core.usecase.commons.PagedList;
import com.vixteam.framework.common.support.QueryObject;
import com.vixteam.framework.core.domain.commons.IEntity;

import java.io.Serializable;

public interface IEntityService {
    PagedList find(String entityPath, QueryObject queryObject);

    Object get(String entityPath, Serializable id) throws ClassNotFoundException;

    <TEntity extends IEntity> TEntity save(TEntity entity);

    void delete(String entityPath, Serializable id) throws ClassNotFoundException;
}
