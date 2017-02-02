package com.vixteam.teamaudit;

import com.vixteam.teamaudit.core.usecase.baseentity.EntityQuery;
import com.vixteam.teamaudit.core.usecase.commons.Page;
import com.vixteam.teamaudit.core.usecase.commons.PagedList;
import com.vixteam.teamaudit.core.usecase.commons.UseCaseFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

import java.io.Console;

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
        entityQuery.setEntityPath("escopo");
        entityQuery.setPage(new Page());

        PagedList pagedList = facade.execute(entityQuery);

        int count = pagedList.getList().size();

        System.out.println("Sucesso!");
    }
}
