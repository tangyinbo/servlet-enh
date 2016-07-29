package com.cowboy.listener;

import javax.servlet.ServletContextAttributeEvent;
import javax.servlet.ServletContextAttributeListener;

public class MyServletContextAttributeListern implements ServletContextAttributeListener{

	@Override
	public void attributeAdded(ServletContextAttributeEvent scab) {
		System.out.println("====>>>"+System.currentTimeMillis()+":MyServletContextAttributeListern.attributeAdded=>"+scab.getName()+":"+scab.getValue());
	}

	@Override
	public void attributeRemoved(ServletContextAttributeEvent scab) {
		System.out.println("====>>>"+System.currentTimeMillis()+":MyServletContextAttributeListern.attributeRemoved=>"+scab.getName()+":"+scab.getValue());
	}

	@Override
	public void attributeReplaced(ServletContextAttributeEvent scab) {
		System.out.println("====>>>"+System.currentTimeMillis()+":MyServletContextAttributeListern.attributeReplaced=>"+scab.getName()+":"+scab.getValue());
	}

}
