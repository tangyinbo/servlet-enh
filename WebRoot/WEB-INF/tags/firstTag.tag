<%@ tag import="java.util.Date,java.text.DateFormat"%>
<%
	DateFormat df = DateFormat.getDateInstance(DateFormat.LONG);
	Date now = new Date(System.currentTimeMillis());
	out.print(df.format(now));
 %>
