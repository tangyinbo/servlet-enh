package com.cowboy.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.JspFragment;
import javax.servlet.jsp.tagext.SimpleTagSupport;

public class SelectTag extends SimpleTagSupport{
	private String[] countrys = {"china","usa","franch"};
	@Override
	public void doTag() throws JspException, IOException {
		JspWriter out = getJspContext().getOut();
		out.print("<select>");
		for(int i=0;i<countrys.length;i++){
			getJspContext().setAttribute("value", countrys[i]);
			getJspContext().setAttribute("name", countrys[i]);
			getJspBody().invoke(null);
		}
		out.print("</select>");
	}
}
