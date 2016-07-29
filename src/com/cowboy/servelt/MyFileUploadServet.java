package com.cowboy.servelt;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.StringTokenizer;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.cowboy.domain.Person;

@WebServlet(name = "fileUploadServlet", urlPatterns = "/fileUploadServelt", initParams = { @WebInitParam(name = "path", value = "upfile") })
@MultipartConfig
public class MyFileUploadServet extends GatherParamsToEntity {
	private String filePath;

	@Override
	public void init() throws ServletException {
		filePath = this.getServletConfig().getInitParameter("path");
	}

	/**
	 * 
	 * @param req
	 * @param resp
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void processRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
		Collection<Part> ps = req.getParts();
		String fileUploadPath = req.getServletContext().getRealPath("WEB-INF");
		File parantFile = fileUploadFolderCreate(fileUploadPath);
		PrintWriter pw = resp.getWriter();
		try {
			Person p = reflectParams(Person.class, req.getParameterMap());
			int a = 1/1;
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		for (Part p : ps) {
			Collection<String> c  = p.getHeaderNames();
			for(String s:c){
				System.out.println(s);
			}
			String outStr = saveFile(parantFile.getAbsolutePath(),p);
			pw.print(outStr);
			pw.print("<br/>");
		}
		pw.print(req.getParameter("name"));
	}
	
	private <T>T  t(Class<T> s){
		return null;
	}

	private File fileUploadFolderCreate(String fileUploadPath) {
		File file = new File(fileUploadPath, filePath);
		if(!file.exists()){
			file.mkdir();
		}
		return file;
	}
	
	private String saveFile(String filePath,Part p) throws IOException{
		String contentDisposition = p.getHeader("content-disposition");
		
		StringTokenizer st = new StringTokenizer(contentDisposition, ";");
		String fileName = null;
		while(st.hasMoreElements()){
			String token = st.nextToken();
			if(token != null && token.trim().startsWith("filename")){
				fileName = token.split("=")[1];
				fileName = fileName!=null?fileName.replace("\"", ""):null;
				fileName = fileName!=null?fileName.substring(fileName.lastIndexOf("\\")+1):null;
				
			}
		}
		String realFileName = filePath+File.separator+fileName;
		p.write(realFileName);
		return realFileName;
	}

}
