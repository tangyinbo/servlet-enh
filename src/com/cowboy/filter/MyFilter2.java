package com.cowboy.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class MyFilter2 implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		System.out.println("===>>>fMyFilter2.init=>filterName:"+filterConfig.getFilterName()+","+filterConfig.getInitParameter("name"));
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		System.out.println("===>>>fMyFilter2.doFilter");
		HttpServletRequest req = (HttpServletRequest) request;
		System.out.println("===>>>referer:"+req.getHeader("referer"));
		chain.doFilter(request, response);
		System.out.println("===>>>fMyFilter2.doFilter-----------after");
	}

	@Override
	public void destroy() {
		System.out.println("===>>>fMyFilter2.destroy");
	}

}
