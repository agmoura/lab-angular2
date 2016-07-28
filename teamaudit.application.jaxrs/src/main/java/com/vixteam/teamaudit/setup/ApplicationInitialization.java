package com.vixteam.teamaudit.setup;

import javax.inject.Inject;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ApplicationInitialization implements ServletContextListener {

    @Inject
    DatabaseLoader databaseLoader;

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        databaseLoader.loadDatabase();
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
