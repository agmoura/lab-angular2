package com.vixteam.teamaudit.core.domain.commons;

import java.io.Serializable;

public interface Repository<TEntity> {

    //AGM HibernateQuery<TEntity> query();

    TEntity find(Serializable id);

    void flush();

    void insert(TEntity entity);

    TEntity save(TEntity entity);

    void delete(TEntity entity);

}
