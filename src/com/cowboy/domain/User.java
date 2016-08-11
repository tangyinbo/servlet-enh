package com.cowboy.domain;

import java.util.Date;

public class User {
	private Long id;
	private String name;
	private int age;
	private Date birthday;
	private String address;
	private String email;
	private String telephone;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public User(Long id, String name, int age, Date birthday, String address, String email, String telephone) {
		super();
		this.id = id;
		this.name = name;
		this.age = age;
		this.birthday = birthday;
		this.address = address;
		this.email = email;
		this.telephone = telephone;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
