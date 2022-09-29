package com.handong.swap.DAOImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.handong.swap.DAO.UserDAO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramReadDTO;
import com.handong.swap.DTO.UserDTO;

@Repository
public class UserDAOImpl implements UserDAO{
	
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<UserDTO> read(){
		return sqlSession.selectList("User.readUser");
	}

	@Override
	public void updateAdmin(int id) {
		sqlSession.update("User.updateAdmin", id);
	}
	
	@Override
	public void updateUser(int id) {
		sqlSession.update("User.updateUser", id);
	}

	@Override
	public void updateDelDate(int id) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", id);
	    sqlSession.update("User.updateDelDate", param);
	}

	@Override
	public List<UserDTO> readStudents() {
		return sqlSession.selectList("User.readStudents");
	}

	@Override
	public List<UserDTO> readDeletedUsers() {
		return sqlSession.selectList("User.readDeletedUsers");
	}

	@Override
	public void restore(int id) {
		sqlSession.update("User.restoreUser", id);
	}
	
	@Override
	public List<UserDTO> readLoggedInUserById(int id) {
		return sqlSession.selectList("User.readLoggedInUser",id);
	}
	
	@Override
	public void updateUserInfo(UserDTO user) {
	    sqlSession.update("User.updateUserInfo", user);
	}
}
