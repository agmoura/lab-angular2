package com.vixteam.teamaudit.provider.domain.logaudit;

import java.io.Serializable;
import java.util.*;

import com.vixteam.teamaudit.core.domain.AuditLog;
import com.vixteam.teamaudit.core.domain.AuditLogItem;
import com.vixteam.teamaudit.core.domain.OperationEnum;
import com.vixteam.teamaudit.core.domain.commons.IEntity;
import org.hibernate.*;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

/* REFERENCES:
https://developer.jboss.org/wiki/AuditLogging
http://nsinfra.blogspot.com.br/2013/10/audit-logging-using-hibernate.html
*/

@Component
public class AuditLogInterceptor extends EmptyInterceptor {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Autowired
    private EntityManager entityManager;

    private Set<AuditLog> auditLogs = new HashSet<>();

    @PostConstruct
    public void init() {
        AuditLogDelegateInterceptor.setInterceptor(this);
    }

    @Override
    public boolean onSave(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) throws CallbackException {
        addAuditLog(entity, id, OperationEnum.Insert, state, null, propertyNames);
        return false;
    }

    @Override
    public void onDelete(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) {
        this.addAuditLog(entity, id, OperationEnum.Delete, null, null, propertyNames);
    }

    @Override
    public boolean onFlushDirty(Object entity, Serializable id, Object[] currentState, Object[] previousState, String[] propertyNames, Type[] types) throws CallbackException {
        this.addAuditLog(entity, id, OperationEnum.Update, currentState, previousState, propertyNames);
        return false;
    }

    @Override
    public void postFlush(Iterator iterator) throws CallbackException {
        try {
            SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
            SessionBuilder builder = sessionFactory.withOptions();
            Session session = builder.interceptor(INSTANCE).openSession();

            try {
                for (AuditLog auditLog : auditLogs) session.save(auditLog);
                session.flush();
            } finally {
                session.close();
            }
        } finally {
            auditLogs.clear();
        }
    }

    private void addAuditLog(Object entity, Serializable id, OperationEnum operation, Object[] currentState, Object[] previousState, String[] propertyNames) {
        if(entity instanceof AuditLog) return;

        AuditLog auditLog = new AuditLog();
        auditLog.setEntityName(entity.getClass().getName());
        auditLog.setEntityId(id.toString());
        auditLog.setOperation(operation);
        auditLog.setDateCreated(new Date());
        auditLog.setUser("{user}");
        auditLog.setItems(getAuditLogItems(auditLog, currentState, previousState, propertyNames));
        this.auditLogs.add(auditLog);
    }

    private List<AuditLogItem> getAuditLogItems(AuditLog auditLog, Object[] currentState, Object[] previousState, String[] propertyNames) {

        List<AuditLogItem> items = new ArrayList<>();

        if(currentState != null) {
            for (int i = 0; i < currentState.length; i++) {
                Object previous = previousState == null ? null : previousState[i];
                Object current = currentState[i];

                if (previous == null && current != null || previous != null && !previous.equals(current)) {
                    AuditLogItem item = new AuditLogItem();
                    item.setAuditLog(auditLog);
                    item.setField(propertyNames[i]);
                    item.setOldValue(getValue(previous));
                    item.setNewValue(getValue(current));
                    items.add(item);
                }
            }
        }

        return items;
    }

    private String getValue(Object value) {
        if(value == null) return null;

        if(value instanceof IEntity && !entityManager.contains(value)) {
            value = entityManager.find(value.getClass(), ((IEntity) value).getId());
        }

        String stringValue = value.toString();
        if(stringValue.length() > 255) return stringValue.substring(0, 255);
        return stringValue;
    }

}