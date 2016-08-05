package com.vixteam.teamaudit.services;

import com.vixteam.framework.common.support.PagedList;
import com.vixteam.framework.common.support.QueryObject;
import com.vixteam.framework.domain.IEntity;
import com.vixteam.teamaudit.repositories.IEntityRepository;

import javax.inject.Inject;
import com.vixteam.extension.container.transaction.Transactional;
//import javax.transaction.Transactional;
import java.io.Serializable;

public class EntityService implements IEntityService {

    @Inject
    private IEntityRepository repository;

    @Override
    public PagedList find(String entityPath, QueryObject queryObject) {
        return repository.find(entityPath, queryObject);
    }

    @Override
    public Object get(String entityPath, Serializable id) throws ClassNotFoundException {
        return repository.get(entityPath, id);
    }

    @Transactional
    @Override
    public <TEntity extends IEntity> TEntity save(TEntity entity) {
        return repository.save(entity);
    }

    @Transactional
    @Override
    public void delete(String entityPath, Serializable id) throws ClassNotFoundException {
        repository.delete(entityPath, id);
    }
}
