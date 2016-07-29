package com.cowboy.listener;

import javax.servlet.http.HttpSessionActivationListener;
import javax.servlet.http.HttpSessionEvent;

public class MySessionActivationListener implements HttpSessionActivationListener{

	@Override
	public void sessionWillPassivate(HttpSessionEvent se) {
		System.out.println("====>>>"+System.currentTimeMillis()+":MySessionActivationListener.sessionWillPassivate=>sessionId:"+se.getSession().getId());
	}

	@Override
	public void sessionDidActivate(HttpSessionEvent se) {
		System.out.println("====>>>"+System.currentTimeMillis()+":MySessionActivationListener.sessionDidActivate=>sessionId:"+se.getSession().getId());
	}

}
