<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="fileUploadServelt" enctype="multipart/form-data" name="uploadForm" method="post" >
		select a file to update<input type="file" name="myfile"/><br/>
		name:<input type="text" name="name"/><br/>
		name:<input type="text" name="age"/><br/>
		name:<input type="text" name="id"/><br/>
		<input type="submit" value="upload">
	</form>
</body>
</html>