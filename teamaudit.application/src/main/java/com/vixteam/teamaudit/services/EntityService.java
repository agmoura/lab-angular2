package com.vixteam.teamaudit.services;

import com.vixteam.teamaudit.core.usecase.EntityQuery;
import com.vixteam.framework.core.usecase.commons.PagedList;
import com.vixteam.framework.core.domain.commons.IEntity;
import com.vixteam.teamaudit.repositories.IEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.List;

@Service
public class EntityService implements IEntityService {

    @Autowired
    private IEntityRepository repository;

    @Override
    public PagedList find(EntityQuery entityQuery) {
        return repository.find(entityQuery);
    }

    @Override
    public <TEntity extends IEntity> List<TEntity> findList(EntityQuery entityQuery) {
        return repository.findList(entityQuery);
    }

    @Override
    public Object get(String entityPath, Serializable id) throws ClassNotFoundException {
        return repository.get(entityPath, id);
    }

    @Transactional
    @Override
    public <TEntity extends IEntity> TEntity save(TEntity entity) {
        TEntity result;
        //listener.onBeforeSave(entity);
        result = repository.save(entity);
        //listener.onAfterSave(result);
        return result;
    }

    @Transactional
    @Override
    public void delete(String entityPath, Serializable id) throws ClassNotFoundException {
        repository.delete(entityPath, id);
    }

}
