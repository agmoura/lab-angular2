package com.vixteam.extension.container.transaction;

import org.jboss.weld.context.SessionContext;

import javax.annotation.Priority;
import javax.annotation.Resource;
import javax.enterprise.context.RequestScoped;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.UserTransaction;

@Priority(1)
@Transactional
@Interceptor
public class TransactionInterceptor {

    @PersistenceContext
    EntityManager entityManager;

    /*@Resource(mappedName = "java:comp/UserTransaction")
    private UserTransaction userTransaction;*/

    @AroundInvoke
    public Object manageTransaction(InvocationContext ctx) throws Exception {
        Object result;

        try {
            //userTransaction.begin();
            entityManager.getTransaction().begin();
            result = ctx.proceed();
            entityManager.getTransaction().commit();
            //userTransaction.commit();
        } catch (Throwable ex) {
            //userTransaction.rollback();
            entityManager.getTransaction().rollback();
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
