package com.vixteam.extension.container.persistence;

import com.vixteam.extension.container.persistence.resources.PersistenceContextResourceFactory;
import com.vixteam.extension.container.persistence.resources.PersistenceUnitHolder;
import com.vixteam.extension.container.persistence.resources.PersistenceUnitResourceFactory;
import org.jboss.weld.injection.spi.JpaInjectionServices;
import org.jboss.weld.injection.spi.ResourceReferenceFactory;

import javax.annotation.Priority;
import javax.enterprise.inject.spi.InjectionPoint;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;

@Priority(1)
public class PersistenceService implements JpaInjectionServices {

    private String getUnitName(String unitName) {
        if (unitName.isEmpty()) return "default";
        return unitName;
    }

    @Override
    public ResourceReferenceFactory<EntityManager> registerPersistenceContextInjectionPoint(InjectionPoint injectionPoint) {

        PersistenceContext pc = injectionPoint.getAnnotated().getAnnotation(PersistenceContext.class);

        EntityManagerFactory factory = PersistenceUnitHolder.getInstance()
            .getEntityManagerFactory(getUnitName(pc.unitName()));

        return new PersistenceContextResourceFactory(factory);
    }

    @Override
    public ResourceReferenceFactory<EntityManagerFactory> registerPersistenceUnitInjectionPoint(InjectionPoint injectionPoint) {

        PersistenceUnit pu = injectionPoint.getAnnotated().getAnnotation(PersistenceUnit.class);

        EntityManagerFactory factory = PersistenceUnitHolder.getInstance()
            .getEntityManagerFactory(getUnitName(pu.unitName()));

        return new PersistenceUnitResourceFactory(factory);
    }

    @Override
    public EntityManager resolvePersistenceContext(InjectionPoint injectionPoint) {
        throw new UnsupportedOperationException();
    }

    @Override
    public EntityManagerFactory resolvePersistenceUnit(InjectionPoint injectionPoint) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void cleanup() {
    }
}
