package com.vixteam.teamaudit;

import com.vixteam.teamaudit.core.domain.Escopo;
import com.vixteam.teamaudit.core.usecase.baseentity.QueryEntities;
import com.vixteam.teamaudit.core.usecase.commons.EntityQuery;
import com.vixteam.teamaudit.core.usecase.commons.Page;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.usecase.commons.UseCaseFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class WorkerApplication {

    @Autowired
    UseCaseFacade facade;

    public static void main(final String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfig.class);
        WorkerApplication application = context.getBean(WorkerApplication.class);
        application.run();
    }

    void run() {

        EntityQuery entityQuery = new EntityQuery();
        entityQuery.setPage(new Page());

        PagedList<Object[]> pagedList = facade.execute(new QueryEntities<>(Escopo.class, entityQuery));

        int count = pagedList.getList().size();

        System.out.println("Sucesso!");
    }
}
