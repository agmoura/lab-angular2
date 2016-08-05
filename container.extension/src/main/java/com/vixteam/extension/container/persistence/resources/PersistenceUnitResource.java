package com.vixteam.extension.container.persistence.resources;

import org.jboss.weld.injection.spi.ResourceReference;

import javax.persistence.EntityManagerFactory;

public class PersistenceUnitResource implements ResourceReference<EntityManagerFactory> {

    private EntityManagerFactory entityManagerFactory;

    public PersistenceUnitResource(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public EntityManagerFactory getInstance() {
        return entityManagerFactory;
    }

    @Override
    public void release() {

    }
}
