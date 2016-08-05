package com.vixteam.extension.container.persistence.resources;

import org.jboss.weld.injection.spi.ResourceReference;
import org.jboss.weld.injection.spi.ResourceReferenceFactory;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

public class PersistenceContextResourceFactory implements ResourceReferenceFactory<EntityManager> {

    private EntityManagerFactory entityManagerFactory;

    public PersistenceContextResourceFactory(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public ResourceReference<EntityManager> createResource() {
        return new PersistenceContextResource(entityManagerFactory);
    }
}