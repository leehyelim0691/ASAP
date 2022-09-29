package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import com.handong.swap.DAO.ProgramDAO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramFileDTO;
import com.handong.swap.DTO.ProgramReadByUserDTO;
import com.handong.swap.DTO.ProgramReadDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;
import com.handong.swap.Service.ProgramService;

@Service
public class ProgramServiceImpl implements ProgramService{
	
	@Autowired
	ProgramDAO programDAO;
	
	@Override

	public String read() throws JsonProcessingException{
		List<ProgramReadDTO> programDATA = programDAO.read();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}

	public int add(ProgramDTO program) {
		return programDAO.add(program);

	}
	
	public int insertPoster(ProgramFileDTO program) {
		return programDAO.insertPoster(program);
	}
	
	public int insertFile(ProgramFileDTO program) {
		return programDAO.insertPoster(program);
	}

	@Override
	public String readProgramInformationByProgramId(int id) throws JsonProcessingException{
		List<ProgramReadDTO> programDATA = programDAO.readProgramInformationByProgramId(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}


	@Override
	public String readProgramName(int id) throws JsonProcessingException{
		List<ProgramReadNameDTO> programDATA = programDAO.readProgramName(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}
	
	@Override
	public void delete(int id) {
		programDAO.updateDelDate(id);
	}
	
	@Override
	public void deleteFiles(int id) {
		programDAO.deleteFiles(id);
	}
	
	@Override
	public void deleteOnlyFile(int program_id) {
		programDAO.deleteOnlyFile(program_id);
	}
	
	@Override
	public int deleteConfirm(int id) throws JsonProcessingException {
		int programDATA = programDAO.deleteConfirm(id);
		return programDATA;
	}
	
	@Override
	public void updateStatus(int program_id, int status) {
		programDAO.updateStatus(program_id, status);
	}
	
	@Override
	public void updateApplyStatus(int program_id, int apply_status) {
		programDAO.updateApplyStatus(program_id, apply_status);
	}

	@Override
	public void edit(ProgramDTO program) {
		programDAO.edit(program);
	}
	
	@Override
	public void editPoster(ProgramFileDTO programPoster) {
		programDAO.editPoster(programPoster);
	}

	@Override
	public String readByCategory(int category_id) throws JsonProcessingException {
		List<ProgramReadDTO> programDATA = programDAO.readByCategory(category_id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}

	
	@Override
	public void updateApplicantNum(int program_id) {
		programDAO.updateApplicantNum(program_id);
	}

	@Override
	public String readByStatusByUser(int status, int user_id) throws JsonProcessingException {
		List<ProgramReadDTO> programDATA = programDAO.readByStatusByUser(status, user_id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}
	
	@Override
	public String readLikedPrograms(int user_id) throws JsonProcessingException {
		List<ProgramReadDTO> programDATA = programDAO.readLikedPrograms(user_id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}

//	@Override
//	public void decreaseApplicantNum(int program_id) {
//		programDAO.decreaseApplicantNum(program_id);
//	}

	@Override
	public String readApplicationByProgram(int program_id) throws JsonProcessingException {
		List<ProgramReadDTO> programDATA = programDAO.readApplicationByProgram(program_id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}

	@Override
	public void updateApplicationByProgram(int program_id, String application_form) {
		programDAO.updateApplicationByProgram(program_id,application_form);
	}

	@Override
	public String readSurveyByProgram(int program_id) throws JsonProcessingException {
		List<ProgramReadDTO> programDATA = programDAO.readSurveyByProgram(program_id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}

	@Override
	public int confirmApply(ProgramReadByUserDTO program) {
		int result = programDAO.confirmSurvey(program);
		return result;
	}

	@Override
	public void updateSurveyByProgram(int program_id, String survey_form) {
		programDAO.updateSurveyByProgram(program_id,survey_form);
		
	}

	@Override
	public String readByStatusCompleteByUser(int status, int user_id) throws JsonProcessingException {
		List<ProgramReadDTO> programDATA = programDAO.readByStatusCompleteByUser(status, user_id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}

	

}
