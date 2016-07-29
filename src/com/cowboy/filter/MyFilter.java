package com.cowboy.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class MyFilter implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		System.out.println("===>>>MyFilter.init=>filterName:"+filterConfig.getFilterName()+","+filterConfig.getInitParameter("name"));
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		System.out.println("===>>>MyFilter.doFilter");
	
		
		System.out.println("==============================");
		chain.doFilter(request, response);
		System.out.println("===>>>fMyFilter1.doFilter-----------after");
	}

	@Override
	public void destroy() {
		System.out.println("===>>>MyFilter.destroy");
	}

}
