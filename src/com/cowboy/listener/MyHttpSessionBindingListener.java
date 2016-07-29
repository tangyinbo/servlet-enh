package com.cowboy.listener;

import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

public class MyHttpSessionBindingListener implements HttpSessionBindingListener{

	private volatile long count;
	
	public long getCount() {
		return count;
	}

	@Override
	public void valueBound(HttpSessionBindingEvent event) {
		count++;
	}

	@Override
	public void valueUnbound(HttpSessionBindingEvent event) {
		count--;
	}

}
