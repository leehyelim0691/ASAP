package com.handong.swap.DTO;

public class ApplicantReadDTO {
	int id;
	int user_id;
	int program_id;
	String name;
	String phone;
	String email;
	int student_id;
	String department;
	String major1;
	int student_class;
	int semester;
	int status;
	String application_form;
	String survey_form;
	int confirm_survey;
	
	public String getApplication_form() {
		return application_form;
	}
	public void setApplication_form(String application_form) {
		this.application_form = application_form;
	}
	
	public String getSurvey_form() {
		return survey_form;
	}
	public void setSurvey_form(String survey_form) {
		this.survey_form = survey_form;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getConfirm_survey() {
		return confirm_survey;
	}
	public void setConfirm_survey(int confirm_survey) {
		this.confirm_survey = confirm_survey;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getStudent_class() {
		return student_class;
	}
	public void setStudent_class(int student_class) {
		this.student_class = student_class;
	}
	
	public int getSemester() {
		return semester;
	}
	public void setSemester(int semester) {
		this.semester = semester;
	}
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	public int getProgram_id() {
		return program_id;
	}
	public void setProgram_id(int program_id) {
		this.program_id = program_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getStudent_id() {
		return student_id;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getMajor1() {
		return major1;
	}
	public void setMajor1(String major1) {
		this.major1 = major1;
	}
	
	

}
