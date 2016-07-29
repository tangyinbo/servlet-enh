package com.cowboy.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class MySessionListener implements HttpSessionListener{

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		System.out.println("====>>>"+System.currentTimeMillis()+":MySessionAttricuteListener.sessionCreated=>sessionId:"+se.getSession().getId());
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		System.out.println("====>>>"+System.currentTimeMillis()+":MySessionAttricuteListener.sessionDestroyed=>sessionId:"+se.getSession().getId());
	}

}
