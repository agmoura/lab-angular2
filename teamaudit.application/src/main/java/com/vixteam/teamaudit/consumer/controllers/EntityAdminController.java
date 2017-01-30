package com.vixteam.teamaudit.consumer.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vixteam.teamaudit.consumer.commons.ValidationException;
import com.vixteam.teamaudit.core.domain.baseentity.BaseEntity;
import com.vixteam.teamaudit.core.usecase.baseentity.*;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.usecase.commons.UseCaseFacade;
import com.vixteam.teamaudit.provider.domain.baseentity.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@RestController()
@RequestMapping("admin")
public class EntityAdminController {

    @Autowired
    Validator validator;

    @Autowired
    private UseCaseFacade facade;

    @RequestMapping(value = "{queryPath}", method = RequestMethod.GET)
    public List findEntities(@PathVariable String queryPath, @RequestParam List<String> sort, @RequestParam List<String> filter, @RequestParam Integer[] range) {

        EntityQuery entityQuery = new EntityQuery();
        entityQuery.setEntityPath(queryPath);
        entityQuery.setSorts(sort);

        return facade.execute(entityQuery).getList();
    }

    /*@RequestMapping(value = "{queryPath}/query")
    public PagedList queryEntities(@PathVariable String queryPath, @RequestBody EntityQuery entityQuery) {
        assert queryPath.equals(entityQuery.getEntityPath());
        return facade.execute(entityQuery);
    }

    @RequestMapping(value = "{queryPath}/{id}", method = RequestMethod.GET)
    public Object get(@PathVariable String queryPath, @PathVariable String id) throws ClassNotFoundException {
        return facade.execute(new GetBaseEntityQuery(queryPath, id));
    }

    @Transactional
    @RequestMapping(value = "{commandPath}", method = RequestMethod.POST)
    public Object addEntity(@PathVariable String commandPath, @RequestBody String entityData) throws ClassNotFoundException, IOException, NoSuchMethodException, MethodArgumentNotValidException {
        BaseEntity entity = validateEntity(commandPath, null, entityData);
        return facade.execute(new InsertBaseEntityCommand(entity));
    }

    @Transactional
    @RequestMapping(value = "{commandPath}/{id}", method = RequestMethod.PUT)
    public Object updateEntity(@PathVariable String commandPath, @PathVariable String id, @RequestBody String entityData) throws ClassNotFoundException, IOException, NoSuchMethodException, MethodArgumentNotValidException {
        BaseEntity entity = validateEntity(commandPath, id, entityData);
        return facade.execute(new UpdateBaseEntityCommand(entity));
    }

    private BaseEntity validateEntity(String commandPath, String entityId, String entityData) throws ClassNotFoundException, IOException, NoSuchMethodException, MethodArgumentNotValidException {
        // Build Object Entity from JSON Data
        String entityName = EntityRepository.getEntityName(commandPath);
        BaseEntity entity = (BaseEntity) new ObjectMapper().readValue(entityData, Class.forName(entityName));

        // Validate Entity
        BindingResult result = new BeanPropertyBindingResult(entity, entityName);
        validator.validate(entity, result);
        if(result.hasErrors())
            throw new ValidationException(result);

        return entity;
    }

    @Transactional
    @RequestMapping(value = "{commandPath}/{id}", method = RequestMethod.DELETE)
    public void deleteEntity(@PathVariable String commandPath, @PathVariable String id) throws ClassNotFoundException {
        facade.execute(new DeleteBaseEntityCommand(commandPath, id));
    }*/
}
