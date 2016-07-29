package com.cowboy.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class MyServeltContextListener implements ServletContextListener{

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		System.out.println("====>>>"+System.currentTimeMillis()+":MyServeltContextListener.contextDestroyed");
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		System.out.println("====>>>"+System.currentTimeMillis()+":MyServeltContextListener.contextInitialized");
	}

}
