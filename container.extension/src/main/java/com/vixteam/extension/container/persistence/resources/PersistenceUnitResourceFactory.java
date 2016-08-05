package com.vixteam.extension.container.persistence.resources;

import org.jboss.weld.injection.spi.ResourceReference;
import org.jboss.weld.injection.spi.ResourceReferenceFactory;

import javax.persistence.EntityManagerFactory;

public class PersistenceUnitResourceFactory implements ResourceReferenceFactory<EntityManagerFactory> {

    private EntityManagerFactory entityManagerFactory;

    public PersistenceUnitResourceFactory(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public ResourceReference<EntityManagerFactory> createResource() {
        return new PersistenceUnitResource(entityManagerFactory);
    }
}