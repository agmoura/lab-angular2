package com.vixteam.teamaudit.consumer.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vixteam.teamaudit.core.usecase.EntityQuery;
import com.vixteam.framework.core.usecase.commons.PagedList;
import com.vixteam.framework.core.usecase.commons.UseCaseFacade;
import com.vixteam.framework.core.domain.commons.IEntity;
import com.vixteam.teamaudit.repositories.EntityRepository;
import com.vixteam.teamaudit.resources.support.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController()
@RequestMapping("api")
public class BaseController {

    @Autowired
    Validator validator;

    @Autowired
    private UseCaseFacade facade;

    @RequestMapping(value = "{queryPath}", method = RequestMethod.GET)
    public PagedList findEntities(@PathVariable String queryPath, EntityQuery entityQuery) {
        return queryEntities(queryPath, entityQuery);
    }

    @RequestMapping(value = "{queryPath}/query")
    public PagedList queryEntities(@PathVariable String queryPath, @RequestBody EntityQuery entityQuery) {
        assert queryPath.equals(entityQuery.getEntityPath());
        return facade.execute(entityQuery);
    }

    @RequestMapping(value = "{queryPath}/{id}", method = RequestMethod.GET)
    public Object get(@PathVariable String queryPath, @PathVariable String id) throws ClassNotFoundException {


        return service.get(queryPath, id);
    }

    @RequestMapping(value = "{commandPath}", method = RequestMethod.POST)
    public Object addEntity(@PathVariable String commandPath, @RequestBody String entityData) throws ClassNotFoundException, IOException, NoSuchMethodException, MethodArgumentNotValidException {
        return saveEntity(commandPath, null, entityData);
    }

    @RequestMapping(value = "{commandPath}/{id}", method = RequestMethod.PUT)
    public Object updateEntity(@PathVariable String commandPath, @PathVariable String id, @RequestBody String entityData) throws ClassNotFoundException, IOException, NoSuchMethodException, MethodArgumentNotValidException {
        return saveEntity(commandPath, id, entityData);
    }

    private Object saveEntity(String commandPath, String entityId, String entityData) throws ClassNotFoundException, IOException, NoSuchMethodException, MethodArgumentNotValidException {
        // Build Object Entity from JSON Data
        String entityName = EntityRepository.getEntityName(commandPath);
        IEntity entity = (IEntity) new ObjectMapper().readValue(entityData, Class.forName(entityName));

        // Validate Entity
        BindingResult result = new BeanPropertyBindingResult(entity, entityName);
        validator.validate(entity, result);
        if(result.hasErrors())
            throw new ValidationException(result);

        // Add or Update Entity
        return service.save(entity);
    }

    @RequestMapping(value = "{commandPath}/{id}", method = RequestMethod.DELETE)
    public void deleteEntity(@PathVariable String commandPath, @PathVariable String id) throws ClassNotFoundException {
        service.delete(commandPath, id);
    }
}
