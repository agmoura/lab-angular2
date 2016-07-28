package com.vixteam.teamaudit.repositories;

import com.vixteam.framework.common.support.Page;
import com.vixteam.framework.common.support.PagedList;
import com.vixteam.framework.common.support.QueryObject;

import javax.persistence.*;
import java.io.Serializable;

public class EntityRepository implements IEntityRepository {

    private static EntityManagerFactory entityManagerFactory;

    @PersistenceContext
    private EntityManager entityManager;

    private Boolean isApplicationManaged = null;

    private EntityManager getEntityManager(){
        if(entityManager != null) return entityManager;

        isApplicationManaged = true;

        if(entityManagerFactory == null)
            entityManagerFactory = Persistence.createEntityManagerFactory("default");

        return entityManager = entityManagerFactory.createEntityManager();
    }

    public void beginTransaction(){
        if(isApplicationManaged == null) isApplicationManaged = entityManager == null;

        if(isApplicationManaged) getEntityManager().getTransaction().begin();
    }

    public void commitTransaction(){
        if(isApplicationManaged) getEntityManager().getTransaction().commit();
    }

    public void rollbackTransaction(){
        if(isApplicationManaged) getEntityManager().getTransaction().rollback();
    }

    public static String getEntityName(String entityPath) {
        return "com.vixteam.teamaudit.domain." + entityPath.substring(0, 1).toUpperCase() + entityPath.substring(1);
    }

    @Override
    public PagedList find(String entityPath, QueryObject queryObject) {

        EntityManager entityManager = getEntityManager();

        queryObject.setEntityName(getEntityName(entityPath));
        Query query = entityManager.createQuery(queryObject.buildQuery());
        Page page = queryObject.getPage();

        if (page != null) {
            page.setTotalItens(((Long) entityManager.createQuery(queryObject.buildCountQuery()).getSingleResult()).intValue());
            query.setFirstResult(page.getFirstItemIndex());
            query.setMaxResults(page.getSize());
        }

        return new PagedList(query.getResultList(), page);
    }

    @Override
    public Object get(String entityPath, Serializable id) throws ClassNotFoundException {
        return getEntityManager().find(Class.forName(getEntityName(entityPath)), id);
    }

    @Override
    public <TEntity> TEntity save(Serializable id, TEntity entity) {

        EntityManager entityManager = getEntityManager();

        beginTransaction();

        try {
            if (id != null)
                entity = entityManager.merge(entity);
            else
                entityManager.persist(entity);

            commitTransaction();
        }

        catch (Throwable ex) {
            rollbackTransaction();
            throw ex;
        }

        return entity;
    }

    @Override
    public void delete(String entityPath, Serializable id) throws ClassNotFoundException {

        EntityManager entityManager = getEntityManager();

        beginTransaction();

        try {
            Object entity = get(entityPath, id);
            entityManager.remove(entity);
            commitTransaction();
        }

        catch (Throwable ex) {
            rollbackTransaction();
            throw ex;
        }
    }
}