package com.vixteam.teamaudit.provider.domain.baseentity;

import com.vixteam.teamaudit.core.usecase.commons.EntityQuery;
import com.vixteam.teamaudit.core.usecase.commons.Page;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.domain.commons.IEntity;

import com.vixteam.teamaudit.core.domain.baseentity.IEntityRepository;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.Serializable;

@Repository
public class EntityRepository<TEntity extends IEntity> implements IEntityRepository<TEntity> {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public PagedList<Object[]> query(Class<TEntity> entityClass, EntityQuery entityQuery) {

        // Build Base Criteria Query
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        EntityQueryProcessor<TEntity, Object[]> processor = new EntityQueryProcessor<>(entityQuery, entityClass, builder);
        CriteriaQuery<Object[]> criteriaQuery = processor.buildCriteriaQuery();
        TypedQuery<Object[]> query = entityManager.createQuery(criteriaQuery);

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
        return new PagedList<>(query.getResultList(), page);
    }

    @Override
    public TEntity get(Class<TEntity> entityClass, Serializable id) {
        return entityManager.find(entityClass, id);
    }

    @Override
    public TEntity save(TEntity entity) {
        if (entity.getId() != null)
            entity = entityManager.merge(entity);
        else
            entityManager.persist(entity);

        return entity;
    }

    @Override
    public void delete(Class<TEntity> entityClass, Serializable id) {
        Object entity = this.get(entityClass, id);
        entityManager.remove(entity);
    }
}