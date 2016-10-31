package com.vixteam.teamaudit.repositories;

import javax.inject.Inject;
import javax.persistence.*;
import javax.transaction.Transactional;
import java.io.Serializable;
import com.vixteam.framework.common.support.Page;
import com.vixteam.framework.common.support.PagedList;
import com.vixteam.framework.common.support.QueryObject;
import com.vixteam.framework.common.support.Schema;
import com.vixteam.framework.domain.IEntity;

public class EntityRepository implements IEntityRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public static String getEntityName(String entityPath) {
        return "com.vixteam.teamaudit.domain." + entityPath.substring(0, 1).toUpperCase() + entityPath.substring(1);
    }

    @Override
    public PagedList find(String entityPath, QueryObject queryObject) {
        queryObject.setEntityName(getEntityName(entityPath));
        Query query = entityManager.createQuery(queryObject.buildQuery());
        Page page = queryObject.getPage();

        if (page != null) {
            page.setTotalItems(((Long) entityManager.createQuery(queryObject.buildCountQuery()).getSingleResult()).intValue());
            query.setFirstResult(page.getFirstItemIndex());
            query.setMaxResults(page.getSize());
        }

        return new PagedList(query.getResultList(), page, new Schema());
    }

    @Override
    @Transactional
    public Object get(String entityPath, Serializable id) throws ClassNotFoundException {
        Object entity = entityManager.find(Class.forName(getEntityName(entityPath)), id);
        return entity;
    }

    @Override
    public <TEntity extends IEntity> TEntity save(TEntity entity) {
        if (entity.getId() != null)
            entity = entityManager.merge(entity);
        else
            entityManager.persist(entity);

        return entity;
    }

    @Override
    public void delete(String entityPath, Serializable id) throws ClassNotFoundException {
        Object entity = get(entityPath, id);
        entityManager.remove(entity);
    }
}