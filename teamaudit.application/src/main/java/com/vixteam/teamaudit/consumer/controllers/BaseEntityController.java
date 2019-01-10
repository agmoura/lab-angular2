/*
package com.vixteam.teamaudit.consumer.controllers;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vixteam.teamaudit.consumer.commons.ApplicationException;
import com.vixteam.teamaudit.core.usecase.commons.EntityQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.usecase.commons.UseCaseFacade;
import com.vixteam.teamaudit.core.usecase.baseentity.*;
import com.vixteam.teamaudit.consumer.commons.ValidationException;

import com.vixteam.teamaudit.core.domain.baseentity.BaseEntity;
import com.vixteam.teamaudit.provider.domain.baseentity.EntityRepository;

import javax.transaction.Transactional;

@Deprecated
@RestController
@RequestMapping("api")
public class BaseEntityController {

    private static String getEntityName(String entityPath) {
        String path = entityPath.equals("objetivo") ||  entityPath.equals("categoriaObjetivo") ? "objetivo." : "";
        return "com.vixteam.teamaudit.core.domain." + path + entityPath.substring(0, 1).toUpperCase() + entityPath.substring(1);
    }

    private static Class getEntityClass(String entityPath) {
        try {
            return Class.forName(getEntityName(entityPath));
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Autowired
    Validator validator;

    @Autowired
    private UseCaseFacade facade;

    //TODO: Remover código de teste
    @RequestMapping(value = "{commandPath}/execute", method = RequestMethod.POST)
    public Object executeAction(@PathVariable String commandPath, String id, String action, @RequestParam Integer number) {

        return facade.execute(new GetEntity(getEntityClass(commandPath), id));
    }


    @RequestMapping(value = "{queryPath}", method = RequestMethod.GET)
    public PagedList findEntities(@PathVariable String queryPath, EntityQuery entityQuery) {
        return queryEntities(queryPath, entityQuery);
    }

    @RequestMapping(value = "{queryPath}/query")
    public PagedList<Object[]> queryEntities(@PathVariable String queryPath, @RequestBody EntityQuery entityQuery) {
        return facade.execute(new QueryEntities<BaseEntity>(getEntityClass(queryPath), entityQuery));
    }

    @RequestMapping(value = "{queryPath}/{id}", method = RequestMethod.GET)
    public Object get(@PathVariable String queryPath, @PathVariable String id) throws ClassNotFoundException {
        return facade.execute(new GetEntity<>(getEntityClass(queryPath), id));
    }

    @Transactional
    @RequestMapping(value = "{commandPath}", method = RequestMethod.POST)
    public Object addEntity(@PathVariable String commandPath, @RequestBody String entityData) throws ClassNotFoundException, IOException, NoSuchMethodException, MethodArgumentNotValidException {
        BaseEntity entity = validateEntity(commandPath, null, entityData);
        return facade.execute(new AddEntity<>(entity));
    }

    @Transactional
    @RequestMapping(value = "{commandPath}/{id}", method = RequestMethod.PUT)
    public Object updateEntity(@PathVariable String commandPath, @PathVariable String id, @RequestBody String entityData) throws ClassNotFoundException, IOException, NoSuchMethodException, MethodArgumentNotValidException {
        BaseEntity entity = validateEntity(commandPath, id, entityData);
        return facade.execute(new UpdateEntity<>(entity));
    }

    @Transactional
    @RequestMapping(value = "{commandPath}/{id}", method = RequestMethod.PATCH)
    public Object patchEntity(@PathVariable String commandPath, @PathVariable String id, @RequestBody String entityData) throws ClassNotFoundException {

        BaseEntity entity;
        Object currentEntity = get(commandPath, id);

        try {
            entity = new ObjectMapper().readerForUpdating(currentEntity).readValue(entityData);
        } catch (IOException ex) {
            throw new ApplicationException("Erro ao deserializar '" + entityData + "' na entidade '" + commandPath + "'");
        }

        return this.facade.execute(new UpdateEntity<>(entity));
    }

    private BaseEntity validateEntity(String commandPath, String entityId, String entityData) throws ClassNotFoundException, IOException, NoSuchMethodException, MethodArgumentNotValidException {
        // Build Object Entity from JSON Date
        String entityName = getEntityName(commandPath);
        BaseEntity entity = (BaseEntity) new ObjectMapper().readValue(entityData, Class.forName(entityName));

        // Validate Entity
        BindingResult result = new BeanPropertyBindingResult(entity, entityName);
        validator.validate(entity, result);
        if (result.hasErrors())
            throw new ValidationException(result);

        return entity;
    }

    @Transactional
    @RequestMapping(value = "{commandPath}/{id}", method = RequestMethod.DELETE)
    public void deleteEntity(@PathVariable String commandPath, @PathVariable String id) throws ClassNotFoundException {
        facade.execute(new DeleteEntity<>(getEntityClass(commandPath), id));
    }
}
*/
