package com.cowboy.test;

import java.io.File;
import java.util.Scanner;

public class TT {
	public static void main(String[] args) {
		String path = "C:/java_workspace/MideaW/GOMS_OMS_V01R00_20160501/goms/webroot/WEB-INF/classes/com/midea/gcrm/gcrmaccountpublic/v1";
		path = new Scanner(System.in).next();
		System.out.println(path);
		File f = new File(path);
		File[] fs = f.listFiles();
		for (File s : fs) {
			s.delete();
		}
	}
}
