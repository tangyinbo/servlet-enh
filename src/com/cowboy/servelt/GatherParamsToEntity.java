package com.cowboy.servelt;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public abstract class GatherParamsToEntity extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		processRequest(req, resp);
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		processRequest(req, resp);
	}
	
	protected abstract void processRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException ;
	
	public <T>T reflectParams(Class<T> clazz,Map<String,String[]> params) throws InstantiationException, IllegalAccessException{
		T t = clazz.newInstance();
		Field[] fs = clazz.getDeclaredFields();
		for(Field f:fs){
			f.setAccessible(true);
			String[] value =  params.get(f.getName());
			if(value != null){
				Class fieldType = f.getType();
				if(fieldType.isAssignableFrom(String.class)){
					f.set(t, value[0]);
				}else if(fieldType.isAssignableFrom(Integer.TYPE)){
					f.set(t, Integer.valueOf(value[0]));
				}else if(fieldType.isAssignableFrom(Long.TYPE)){
						f.set(t, Integer.valueOf(value[0]));
				}				
			}
		}
		return t;
	}
}
