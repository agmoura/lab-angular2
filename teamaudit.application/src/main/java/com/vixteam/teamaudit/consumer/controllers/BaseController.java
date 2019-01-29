package com.vixteam.teamaudit.consumer.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vixteam.teamaudit.core.domain.commons.IEntity;
import com.vixteam.teamaudit.core.usecase.baseentity.*;
import com.vixteam.teamaudit.core.usecase.commons.EntityQuery;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.usecase.commons.UseCase;
import com.vixteam.teamaudit.core.usecase.commons.UseCaseFacade;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.IOException;
import java.io.Serializable;

public abstract class BaseController<TEntity extends IEntity> {

    @Inject
    protected UseCaseFacade facade;

    private Class<TEntity> entityClass;

    public BaseController(Class<TEntity> entityClass) {
        this.entityClass = entityClass;
    }

    @PostMapping("execute")
    public TEntity executeAction(String id, String action, Integer number) {
        return facade.execute(new GetEntity<>(this.entityClass, id));
    }

    /*@GetMapping("{queryPath}")
    public PagedList<TEntity> find(@PathVariable String queryPath, EntityQuery entityQuery) {
        return query(queryPath, entityQuery);
    }*/

    @PostMapping("query")
    public PagedList<Object[]> query(@RequestBody EntityQuery entityQuery) {
        return facade.execute(new QueryEntities<>(this.entityClass, entityQuery));
    }

    @GetMapping("{id}")
    public TEntity get(@PathVariable String id) {
        return facade.execute(new GetEntity<>(this.entityClass, id));
    }

    @Transactional
    @PostMapping
    public TEntity add(@Valid @RequestBody TEntity entity) {
        return facade.execute(mountAddCommand(entity));
    }

    @Transactional
    @PutMapping("{id}")
    public TEntity update(@PathVariable String id, @Valid @RequestBody TEntity entity) {
        return facade.execute(mountUpdateCommand(entity));
    }

    @Transactional
    @PatchMapping("{id}")
    public Object patch(@PathVariable String id, @RequestBody String entityData) throws IOException {
        TEntity currentEntity = this.get(id);
        TEntity entity = new ObjectMapper().readerForUpdating(currentEntity).readValue(entityData);
        return this.facade.execute(new UpdateEntity(entity));
    }

    @Transactional
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        facade.execute(mountDeleteCommand(id));
    }

    protected UseCase<TEntity> mountAddCommand(TEntity entity) {
        return new AddEntity<>(entity);
    }

    protected UseCase<TEntity> mountUpdateCommand(TEntity entity) {
        return new UpdateEntity<>(entity);
    }

    protected UseCase<Void> mountDeleteCommand(Serializable id) {
        return new DeleteEntity<>(this.entityClass, id);
    }
}
