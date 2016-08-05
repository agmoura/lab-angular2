package com.vixteam.teamaudit.resources;

import java.io.IOException;
import java.util.HashMap;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.*;

import com.vixteam.framework.common.support.Errors;
import com.vixteam.framework.common.support.Page;
import com.vixteam.framework.common.support.PagedList;
import com.vixteam.framework.common.support.QueryObject;

@RestController()
@RequestMapping("api")
public class EntityController {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    Validator validator;

    private static String getEntityName(String entity) {
        return "com.vixteam.teamaudit.domain." + entity.substring(0, 1).toUpperCase() + entity.substring(1);
    }

    @RequestMapping(value = "{entityPath}", method = RequestMethod.GET)
    public PagedList getEntityList(@PathVariable String entityPath, QueryObject queryObject) {

        queryObject.setEntityName(getEntityName(entityPath));
        Query query = entityManager.createQuery(queryObject.buildQuery());
        Page page = queryObject.getPage();

        if (page != null) {
            page.setTotalItens(((Long) entityManager.createQuery(queryObject.buildCountQuery()).getSingleResult()).intValue());
            query.setFirstResult(page.getFirstItemIndex());
            query.setMaxResults(page.getSize());
        }

        return new PagedList(query.getResultList(), page, null);
    }

    @RequestMapping(value = "{entityPath}/{id}", method = RequestMethod.GET)
    public Object getEntity(@PathVariable String entityPath, @PathVariable String id) throws ClassNotFoundException {
        return entityManager.find(Class.forName(getEntityName(entityPath)), id);
    }

    @Transactional
    @RequestMapping(value = "{entityPath}", method = RequestMethod.POST)
    public Object addEntity(@PathVariable String entityPath, @RequestBody String entityData, HttpServletResponse response) throws ClassNotFoundException, IOException {
        return saveEntity(getEntityName(entityPath), null, entityData, response);
    }

    @Transactional
    @RequestMapping(value = "{entityPath}/{id}", method = RequestMethod.PUT)
    public Object updateEntity(@PathVariable String entityPath, @PathVariable String id, @RequestBody String entityData, HttpServletResponse response) throws ClassNotFoundException, IOException {
        return saveEntity(getEntityName(entityPath), id, entityData, response);
    }

    private Object saveEntity(String entityName, String entityId, String entityData, HttpServletResponse response) throws ClassNotFoundException, IOException {
        // Build Object Entity from JSON Data
        Object entity = new ObjectMapper().readValue(entityData, Class.forName(entityName));

        // Validate Entity
        MapBindingResult errors = new MapBindingResult(new HashMap<String, String>(), entityName);
        validator.validate(entity, errors);
        if(errors.hasErrors()) {
            response.setStatus(HttpStatus.UNPROCESSABLE_ENTITY.value());
            return new Errors(errors);
        }

        // Add or Update Entity
        if(entityId != null) return entityManager.merge(entity);
        entityManager.persist(entity);
        return entity;
    }

    @Transactional
    @RequestMapping(value = "{entityPath}/{id}", method = RequestMethod.DELETE)
    public void deleteEntity(@PathVariable String entityPath, @PathVariable String id, HttpEntity<String> httpEntity) throws ClassNotFoundException {
        Object entity = getEntity(entityPath, id);
        entityManager.remove(entity);
    }
}
