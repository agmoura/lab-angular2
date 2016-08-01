package com.vixteam.teamaudit.repositories;

import javax.persistence.*;
import java.io.Serializable;
import com.vixteam.framework.common.support.Page;
import com.vixteam.framework.common.support.PagedList;
import com.vixteam.framework.common.support.QueryObject;
import com.vixteam.framework.domain.IEntity;

public class EntityRepository implements IEntityRepository {

    @PersistenceContext
    private EntityManager entityManager;

    //private static EntityManagerFactory entityManagerFactory;

    //private Boolean isApplicationManaged = null;

   /* private EntityManager getEntityManager(){
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
    }*/

    public static String getEntityName(String entityPath) {
        return "com.vixteam.teamaudit.domain." + entityPath.substring(0, 1).toUpperCase() + entityPath.substring(1);
    }

    @Override
    public PagedList find(String entityPath, QueryObject queryObject) {
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
        return entityManager.find(Class.forName(getEntityName(entityPath)), id);
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