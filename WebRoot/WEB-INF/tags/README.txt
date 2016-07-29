标签文件必须放在 /WEB-INF/tags  目录下或者子目录下,像标签处理器以一样,标签文件也可以打包成一个jar包.
标签文件的扩展名可以为 .tag,.tagx, 或者作为公共资源文件的.tagf

内置对象:
    request =>  javax.servlet.http.HttpServletRequest
    response => javax.servelt.http.HttpServletResponse
    out     =>  javax.servelt.jsp.JspWriter
    session =>  javax.servelt.http.HttpSession
    application => javax.servelt.ServeltContext
    config   => javax.servelt.ServletConfig
    jspContext => javax.servelt.jsp.JspContext
    
标签文件指令:
    tag     该指令与jsp页面的 page 指令相似
    include 用这个指令包含来自标签文件的其他资源
    taglib  用这个指令聪标签文件内部使用定制标签类库
    attricute 用这个指令在标签文件中申明一个属性
    bariable  用这个指令在标签文件中申明一个暴露给在调用jsp页面的变量


