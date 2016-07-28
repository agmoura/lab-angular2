package com.vixteam.teamaudit.services;

import com.vixteam.framework.common.support.PagedList;
import com.vixteam.framework.common.support.QueryObject;
import com.vixteam.teamaudit.repositories.EntityRepository;
import com.vixteam.teamaudit.repositories.IEntityRepository;

import javax.inject.Inject;
import java.io.Serializable;

public class EntityService implements IEntityService {

    @Inject
    private IEntityRepository repository;

   /* public EntityService(){
        if (repository == null) repository = new EntityRepository();
    }*/

    @Override
    public PagedList find(String entityPath, QueryObject queryObject) {
        return repository.find(entityPath, queryObject);
    }

    @Override
    public Object get(String entityPath, Serializable id) throws ClassNotFoundException {
        return repository.get(entityPath, id);
    }

    @Override
    public <TEntity> TEntity save(Serializable id, TEntity entity) {
        return repository.save(id, entity);
    }

    @Override
    public void delete(String entityPath, Serializable id) throws ClassNotFoundException {
        repository.delete(entityPath, id);
    }
}
