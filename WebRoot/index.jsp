<%@page import="com.cowboy.listener.MyHttpSessionBindingListener"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="com.cowboy.listener.*" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@page import="com.cowboy.domain.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://com.cowboy/tag/firstTag" prefix="cb"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
  	<div><a href="listener.jsp">listener test</a></div>
  	<%
  		MyHttpSessionBindingListener sl = new MyHttpSessionBindingListener();
  	 	if(application.getAttribute("listener")==null){
  	 		application.setAttribute("listener", sl);
  	 	}
  	 %>
  	<hr/>
    This is my JSP page. <br>
    <form name="loginForm" action="myServlet">
    	<input name="name">
    	<br/>
    	<input name="age">
    	<br/>
    	<input type="submit" value="submit">
    </form>
    
    <hr/>
    <%
     	Enumeration<String> eum = request.getHeaderNames();
     	for(;eum.hasMoreElements();){
     		String header = eum.nextElement();
     		out.println(header+"=>"+ request.getHeader(header));
     		out.print("<br/>");
     	}
     %>
     
     
     <hr/>
     <%
     	out.println(session.getId());
     	out.print("<br/>");
     	out.println(URLEncoder.encode(session.getId()));
      %>
      <hr/>

      
      <% 
      	String name ="tangyinbo==";
       %>
       
       <%= name %>
       
       <%! 
        String address = "this is my home address" ;
        %>
        
        <%!
           String sayAddress(){
        		return address;
        	}
         %>
         
         <%!
         	public void jspInit(){
         		System.out.print("hello tangyinbo");
         	}
         	
         	public void jspDestroy(){
         		System.out.print("destroy.....");
         	}
          %>
         
         <jsp:useBean id="myDate" class="java.util.Date"></jsp:useBean>
         <%= myDate %>
         
         <hr/>
        
         
          <jsp:useBean id="person" class="com.cowboy.domain.Person"></jsp:useBean>
         <jsp:setProperty property="name" name="person" value="tangyinbo"/>
         <jsp:getProperty property="name" name="person"/> 
         
         <br/>
      	<c:forEach begin="1" end="10" step="1" var="item">
      		${item }
      	</c:forEach>
         
  		<hr/>
        
        <c:out value="${person.name}" default="kakak...."></c:out>
        <hr/>
        <c:if test="${11>2 }" var="ss">
         wo ....
        </c:if>
        ${ss }
        <hr/>
        <cb:firstTag></cb:firstTag>
        <hr/>
        <cb:selectTag>
        	<option name="${name }" value="${value }">${name }</option>
        </cb:selectTag>
  </body>
</html>
