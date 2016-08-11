package com.cowboy.servelt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import sun.org.mozilla.javascript.internal.json.JsonParser;

import com.alibaba.fastjson.JSON;
import com.cowboy.domain.User;

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
		List<User> users = new MyServelt().getRandomUsers();
		response.getWriter().write(JSON.toJSONString(users));
	}
	
	private List<User> getRandomUsers(){
		int count = new Random().nextInt(100);
		List<User> users = new ArrayList<User>();
		for(int i=0;i<count;i++){
			users.add(new User(new Random().nextLong(), "tangyinbo"+i, new Random().nextInt(100)+1, new Date(), "hunansheng"+i, "xxxx@mail.com","143535353553" ));
		}
		return users;
	}
	
	public static void main(String[] args) {
		List<User> users = new MyServelt().getRandomUsers();
		System.out.println(JSON.toJSONString(users));
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
