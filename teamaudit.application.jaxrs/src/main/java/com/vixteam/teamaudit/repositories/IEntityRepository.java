package com.vixteam.teamaudit.repositories;

import com.vixteam.framework.common.support.PagedList;
import com.vixteam.framework.common.support.QueryObject;

import java.io.Serializable;

public interface IEntityRepository {
    PagedList find(String entityPath, QueryObject queryObject);

    Object get(String entityPath, Serializable id) throws ClassNotFoundException;

    <TEntity> TEntity save(Serializable id, TEntity entity);

    void delete(String entityPath, Serializable id) throws ClassNotFoundException;
}
