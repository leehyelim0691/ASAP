package com.handong.swap.Controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.handong.swap.Service.AdminService;
import com.handong.swap.Service.UserService;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.DTO.UserDTO;

@Controller
@RequestMapping("/admin")
public class AdminController{
	
	@Autowired
	AdminService adminService;
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readAdministrator(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("관리자 읽기.");
		String result = adminService.read();
		System.out.println(result);
	    return result;
	}
	
	@RequestMapping(value = "waitinstructors", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readWaitAdministrator(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("대기중 관리자 읽기 시도");
		String result = adminService.readWaitAdmin();
		System.out.println(result);
	    return result;
	}
	
	
	
	@RequestMapping(value = "add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void addAdministrator(HttpServletRequest httpServletRequest) {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
			adminService.add(Integer.parseInt(ids[i]));
			adminService.updateStatus(Integer.parseInt(ids[i]),0);
		}
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void updateAdministrator(HttpServletRequest httpServletRequest) throws ParseException {
		AdminDTO admin = new AdminDTO();
		System.out.println("update admin Profile!!!");
		
		admin.setId(Integer.parseInt(httpServletRequest.getParameter("id")));
		
		admin.setName(httpServletRequest.getParameter("name"));
		admin.setEmail(httpServletRequest.getParameter("email"));
		admin.setPhone(httpServletRequest.getParameter("phone"));
		
		System.out.println("id: "+ httpServletRequest.getParameter("id"));
		System.out.println("name: "+ httpServletRequest.getParameter("name"));
		System.out.println("email: "+ httpServletRequest.getParameter("email"));
		System.out.println("phone: "+ httpServletRequest.getParameter("phone"));


		adminService.update(admin);
		
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void deleteAdministrator(HttpServletRequest httpServletRequest) {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
			System.out.println("삭제 시도");
			System.out.println("삭제 하려는 아이디 번호: "+ids[i]);
			adminService.delete(Integer.parseInt(ids[i]));
		}
	}
}
