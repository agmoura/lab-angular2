package com.vixteam.teamaudit.services;

import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.repositories.QueryObject;
import com.vixteam.teamaudit.core.domain.commons.IEntity;

import java.io.Serializable;

public interface IEntityService {
    PagedList find(String entityPath, QueryObject queryObject);

    Object get(String entityPath, Serializable id) throws ClassNotFoundException;

    <TEntity extends IEntity> TEntity save(TEntity entity);

    void delete(String entityPath, Serializable id) throws ClassNotFoundException;
}
