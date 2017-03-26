package com.vixteam.teamaudit;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import com.vixteam.teamaudit.provider.domain.logaudit.AuditLogInterceptor;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;


@Configuration
public class BeanConfiguration {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // you USUALLY want this
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public ObjectMapper objectMapperBuilder(Jackson2ObjectMapperBuilder builder) {
        ObjectMapper objectMapper = builder.build();
        Hibernate5Module hibernateModule = new Hibernate5Module();
        hibernateModule.enable(Hibernate5Module.Feature.SERIALIZE_IDENTIFIER_FOR_LAZY_NOT_LOADED_OBJECTS);
        //hibernateModule.disable(Hibernate5Module.Feature.USE_TRANSIENT_ANNOTATION);
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
        objectMapper.registerModule(hibernateModule);
        return objectMapper;
    }

    /*@Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(EntityManagerFactoryBuilder factory, DataSource dataSource, JpaProperties properties) {
        Map<String, Object> jpaProperties = new HashMap<>();
        jpaProperties.putAll(properties.getHibernateProperties(dataSource));
        AuditLogInterceptor auditLogInterceptor = auditLogInterceptor();
        jpaProperties.put("hibernate.ejb.interceptor", auditLogInterceptor);
        LocalContainerEntityManagerFactoryBean factoryBean = factory.dataSource(dataSource)
                .packages("com.vixteam.teamaudit.core.domain")
                .properties((Map) jpaProperties)
                .build();
        //auditLogInterceptor.setEntityManagerFactory(factoryBean.getNativeEntityManagerFactory());
        return factoryBean;
    }*/

    /*@Bean
    @Autowired
    public HibernateTransactionManager transactionManager(SessionFactory sessionFactory) {
        HibernateTransactionManager txManager = new HibernateTransactionManager();
        txManager.setSessionFactory(sessionFactory);

        txManager.setEntityInterceptor(auditLogInterceptor());
        return txManager;
    }*/

   /* @Bean
    public AuditLogInterceptor auditLogInterceptor() {
        return new AuditLogInterceptor();
    }*/
}