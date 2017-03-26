/*
package com.vixteam.teamaudit;

import com.vixteam.teamaudit.provider.domain.logaudit.AuditLogInterceptor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.autoconfigure.transaction.TransactionManagerCustomizers;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.jta.JtaTransactionManager;

import javax.sql.DataSource;
import java.util.Map;

@Configuration
public class HibernateConfiguration extends HibernateJpaAutoConfiguration {

    @Autowired
    AuditLogInterceptor auditLogInterceptor;

    public HibernateConfiguration(DataSource dataSource, JpaProperties jpaProperties, ObjectProvider<JtaTransactionManager> jtaTransactionManager, ObjectProvider<TransactionManagerCustomizers> transactionManagerCustomizers) {
        super(dataSource, jpaProperties, jtaTransactionManager, transactionManagerCustomizers);
    }

    @Override
    protected void customizeVendorProperties(Map<String, Object> vendorProperties) {
        this.entityManagerFactory()

        vendorProperties.put("hibernate.ejb.interceptor", auditLogInterceptor);
    }
}*/
