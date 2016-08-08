package com.vixteam.extension.container.transaction;

import javax.annotation.Priority;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Priority(1)
@Transactional
@Interceptor
public class TransactionInterceptor {

    @PersistenceContext
    EntityManager entityManager;

    @AroundInvoke
    public Object manageTransaction(InvocationContext ctx) throws Exception {

        Object result;
        EntityTransaction transaction = entityManager.getTransaction();

        try {
            transaction.begin();
            result = ctx.proceed();
            transaction.commit();
        }

        catch (Throwable ex) {
            if (transaction.isActive())
                transaction.rollback();
            throw new Exception(ex);
        }

        return result;
    }
}

    /*public Customer updateCustomer(Customer cust) {

        EntityManagerFactory emf = ... ;
        EntityManager em = emf.createEntityManager();
        try {
            EntityTransaction t = em.getTransaction();
            try {
                t.begin();
                // business logic to update the customer
                em.merge(cust);
                t.commit();
            } finally {
                if (t.isActive()) t.rollback();
            }
        } finally {
            em.close();
        }
    }*/
