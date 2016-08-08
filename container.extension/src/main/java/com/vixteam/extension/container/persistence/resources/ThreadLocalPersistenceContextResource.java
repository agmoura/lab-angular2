package com.vixteam.extension.container.persistence.resources;

import org.jboss.weld.injection.spi.ResourceReference;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

public class ThreadLocalPersistenceContextResource implements ResourceReference<EntityManager> {

    private static final ThreadLocal<EntityManager> threadLocal = new ThreadLocal<>();
    private EntityManager entityManager;

    public ThreadLocalPersistenceContextResource(EntityManagerFactory entityManagerFactory) {
        this.entityManager = threadLocal.get();

        if (this.entityManager == null)
            threadLocal.set(this.entityManager = entityManagerFactory.createEntityManager());
    }

    @Override
    public EntityManager getInstance() {
        return entityManager;
    }

    @Override
    public void release() {
        entityManager.close();
        threadLocal.remove();
    }
}