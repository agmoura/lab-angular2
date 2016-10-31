package com.vixteam.teamaudit.repositories;

import com.vixteam.framework.common.support.EntityQuery;
import com.vixteam.framework.common.support.Page;
import com.vixteam.framework.common.support.PagedList;
import com.vixteam.framework.common.support.Schema;
import com.vixteam.framework.domain.IEntity;
import com.vixteam.teamaudit.domain.BaseEntity;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.Serializable;
import java.util.List;

@Repository
public class EntityRepository implements IEntityRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public static String getEntityName(String entityPath) {
        return "com.vixteam.teamaudit.domain." + entityPath.substring(0, 1).toUpperCase() + entityPath.substring(1);
    }

    private Class getEntityClass(String entityPath) {
        try {
            return Class.forName(getEntityName(entityPath));
        }

        catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public PagedList find(EntityQuery entityQuery) {

        // Build Base Criteria Query
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        Class entityClass = getEntityClass(entityQuery.getEntityPath());
        EntityQueryProcessor processor = new EntityQueryProcessor(entityQuery, entityClass, builder);
        CriteriaQuery<?> criteriaQuery = processor.buildCriteriaQuery();
        TypedQuery<?> query = entityManager.createQuery(criteriaQuery);

        // Build and Execute Count Criteria Query
        Page page = entityQuery.getPage();
        if (page != null) {
            CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
            Root countRoot = countQuery.from(entityClass);
            countRoot.alias(EntityQueryProcessor.ROOT_ALIAS);
            countQuery.select(builder.count(countRoot));
            Predicate predicate = criteriaQuery.getRestriction();
            if(predicate != null) countQuery.where(predicate);
            page.setTotalItems(entityManager.createQuery(countQuery).getSingleResult().intValue());
            query.setFirstResult(page.getFirstItemIndex());
            query.setMaxResults(page.getSize());
        }

        // Execute Base Criteria Query
        return new PagedList(query.getResultList(), page, new Schema());
    }


    @Override
    public <TEntity extends IEntity> List<TEntity> findList(EntityQuery entityQuery) {

        // Build Base Criteria Query
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        Class entityClass = getEntityClass(entityQuery.getEntityPath());
        EntityQueryProcessor processor = new EntityQueryProcessor(entityQuery, entityClass, builder);
        CriteriaQuery<TEntity> criteriaQuery = processor.buildCriteriaQuery();
        TypedQuery<TEntity> query = entityManager.createQuery(criteriaQuery);

        // Build and Execute Count Criteria Query
        Page page = entityQuery.getPage();
        if (page != null) {
            CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
            Root countRoot = countQuery.from(entityClass);
            countRoot.alias(EntityQueryProcessor.ROOT_ALIAS);
            countQuery.select(builder.count(countRoot));
            Predicate predicate = criteriaQuery.getRestriction();
            if(predicate != null) countQuery.where(predicate);
            page.setTotalItems(entityManager.createQuery(countQuery).getSingleResult().intValue());
            query.setFirstResult(page.getFirstItemIndex());
            query.setMaxResults(page.getSize());
        }

        // Execute Base Criteria Query
        return query.getResultList();
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