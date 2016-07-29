package com.cowboy.test;

import java.util.ArrayList;
import java.util.List;

public class TT {
/*	框里的鸡蛋一次拿一个能拿完，
	一次拿两个框里剩一个，
	一次三个能拿完，
	一次四个剩一个，
	一次五个剩一个，
	一次六个剩三个，
	一次七个能拿完，
	一次八个剩一个，
	一次九个能拿完！
	问框里多少个鸡蛋*/
	private static int eggNum =9;
	private static int[] tryUnitEggNums={1,3,7,9,2,4,5,6,8};
	private static int[] remainNums={0,0,0,0,1,1,1,3,1};
	public static void main(String[] args) {
		int result =calculateEggs(eggNum);
		System.out.println("鸡蛋个数:"+result);
		for(int s:tryUnitEggNums){
			System.out.println((result+"%"+s+"=")+(result%s));
		}
	}
	
	public static int calculateEggs(int eggNum){
		for(int i=0;i<tryUnitEggNums.length;i++){
			if(eggNum%tryUnitEggNums[i] != remainNums[i]){
				System.out.println(eggNum+"=>"+tryUnitEggNums[i]);
				break;
			}
			if(i==tryUnitEggNums.length-1){
				return eggNum;
			}
		}
		return calculateEggs(++eggNum);
	}
}
