package com.cowboy.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.JspFragment;
import javax.servlet.jsp.tagext.JspTag;
import javax.servlet.jsp.tagext.SimpleTag;

public class MyFirstTag implements SimpleTag{
	JspContext jspContext = null;
	@Override
	public void doTag() throws JspException, IOException {
		jspContext.getOut().print("hello tangyinbo ...");
	}

	@Override
	public JspTag getParent() {
		System.out.println(" getParent");
		return null;
	}

	@Override
	public void setJspBody(JspFragment arg0) {
		System.out.println(" setJspBody");
	}

	@Override
	public void setJspContext(JspContext jspContext) {
		this.jspContext = jspContext;
		System.out.println(" setJspContext");
	}

	@Override
	public void setParent(JspTag jspTag) {
		System.out.println(" setParent ");
	}

}
