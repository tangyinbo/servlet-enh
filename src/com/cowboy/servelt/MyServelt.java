package com.cowboy.servelt;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name="myServlet",urlPatterns="/myServlet")
public class MyServelt implements Servlet{

	@Override
	public void init(ServletConfig config) throws ServletException {
		
	}

	@Override
	public ServletConfig getServletConfig() {
		return null;
	}

	@Override
	public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		
		Map<String,String[]> prams = req.getParameterMap();
		StringBuilder sb =  new StringBuilder();
		sb.append("request.getAuthType():"+request.getAuthType());
		sb.append("<br/>");
		sb.append("request.getPathInfo():"+request.getPathInfo());
		sb.append("<br/>");
		sb.append("request.getPathTranslated():"+request.getPathTranslated());
		sb.append("<br/>");
		sb.append("request.getRemoteUser():"+request.getRemoteUser());
		sb.append("<br/>");
		sb.append("request.getRemoteHost():"+request.getRemoteHost());
		sb.append("<br/>");
		sb.append("request.getRemoteAddr():"+request.getRemoteAddr());
		sb.append("<br/>");
		sb.append("request.getRemotePort():"+request.getRemotePort());
		
		response.getWriter().write(sb.toString());
	}

	@Override
	public String getServletInfo() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}
