package com.handong.swap.Controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.UserDTO;
import com.handong.swap.Service.AdminService;
import com.handong.swap.Service.UserService;


@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	@Autowired
	AdminService adminService;
	
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readUser(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		String result = userService.read();
	    return result;
	}
	
	@RequestMapping(value = "students", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readStudents(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		String result = userService.readStudents();
	    return result;
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void deleteUser(HttpServletRequest httpServletRequest) {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
			userService.delete(Integer.parseInt(ids[i]));
		}
	}
	
	@RequestMapping(value = "deletedusers", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readDeletedUsers(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		String result = userService.readDeletedUsers();
	    return result;
	}
	
	@RequestMapping(value = "restore", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void restoreUser(HttpServletRequest httpServletRequest) {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
			userService.restore(Integer.parseInt(ids[i]));
		}
	}
	
	@RequestMapping(value = "loggedinUser/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readLoggedInUserById(@PathVariable int id) throws IOException, ParseException {
		String result = userService.readLoggedInUserById(id);
		return result;
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void updateUserInfo(HttpServletRequest httpServletRequest) throws ParseException {
		UserDTO user = new UserDTO();
		AdminDTO admin = new AdminDTO();
		System.out.println("update Profile!!!");
		
		int status = Integer.parseInt(httpServletRequest.getParameter("status"));
		user.setId(Integer.parseInt(httpServletRequest.getParameter("id")));
		admin.setUser_id(Integer.parseInt(httpServletRequest.getParameter("id")));
		
		if(status==1) {
			user.setName(httpServletRequest.getParameter("name"));
			user.setEmail(httpServletRequest.getParameter("email"));
			System.out.println("hello!!! "+httpServletRequest.getParameter("student_id"));
			user.setStudent_id(Integer.parseInt(httpServletRequest.getParameter("student_id")));
			user.setPhone(httpServletRequest.getParameter("phone"));
			user.setDepartment(httpServletRequest.getParameter("department"));
			user.setStudent_class(Integer.parseInt(httpServletRequest.getParameter("student_class")));
			user.setSemester(Integer.parseInt(httpServletRequest.getParameter("semester")));
			user.setMajor1(httpServletRequest.getParameter("major1"));
			user.setMajor2(httpServletRequest.getParameter("major2"));
			System.out.println("userInfo: "+ user.toString());
			
		}
		
		if(status==0 || status ==-2) {
			user.setName(httpServletRequest.getParameter("name"));
			user.setEmail(httpServletRequest.getParameter("email"));
			user.setPhone(httpServletRequest.getParameter("phone"));
			user.setDepartment(httpServletRequest.getParameter("department"));
			admin.setName(httpServletRequest.getParameter("name"));
			admin.setEmail(httpServletRequest.getParameter("email"));
			admin.setPhone(httpServletRequest.getParameter("phone"));
			System.out.println("userInfo: "+ user.toString());
			adminService.update(admin);
		}

		userService.updateUserInfo(user);
		
	}
	
	
	
}
