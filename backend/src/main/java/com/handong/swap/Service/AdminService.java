package com.handong.swap.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.DTO.UserDTO;

public interface AdminService {
	
	public void add(int user_id);
	public String read() throws JsonProcessingException;
	public String readWaitAdmin() throws JsonProcessingException;
	public void delete(int id);
	public void update(AdminDTO admin);
	public void updateStatus(int user_id, int status);

}
