package com.vixteam.teamaudit.provider.domain.logaudit;

import org.hibernate.CallbackException;
import org.hibernate.EmptyInterceptor;
import org.hibernate.Interceptor;
import org.hibernate.type.Type;

import java.io.Serializable;
import java.util.Iterator;

public class AuditLogDelegateInterceptor extends EmptyInterceptor {

    private static Interceptor interceptor;

    public static void setInterceptor(Interceptor interceptor) {
        AuditLogDelegateInterceptor.interceptor = interceptor;
    }

    @Override
    public boolean onSave(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) {
      return AuditLogDelegateInterceptor.interceptor.onSave(entity, id, state, propertyNames, types);
    }

    @Override
    public void onDelete(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) {
        AuditLogDelegateInterceptor.interceptor.onDelete(entity,id, state, propertyNames, types);
    }

    @Override
    public boolean onFlushDirty(Object entity, Serializable id, Object[] currentState, Object[] previousState, String[] propertyNames, Type[] types) throws CallbackException {
        return AuditLogDelegateInterceptor.interceptor.onFlushDirty(entity, id, currentState, previousState, propertyNames, types);
    }

    @Override
    public void postFlush(Iterator iterator) throws CallbackException {
        AuditLogDelegateInterceptor.interceptor.postFlush(iterator);
    }
}