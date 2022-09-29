import React, { useState, useLayoutEffect } from "react";
import { Card, Row, Form, Button, Col, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "assets/scss/addProgram.scss";
import { ko } from "date-fns/esm/locale";
import PreviewDefault from "assets/images/previewDefault.png";
import { Input } from "reactstrap";

const BasicInformation = (props) => {
  const { validated, next, handleChange, preview, onLoadPoster, onLoadFile } = props;
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [ApplystartDate, setApplyStartDate] = useState();
  const [ApplyendDate, setApplyEndDate] = useState();
  const [today, setToday] = useState();

  useLayoutEffect(() => {
    var currDate = new Date();
    setToday(currDate.setDate(currDate.getDate()));
  }, []);

  return (
    <Form noValidate validated={validated} onSubmit={next}>
      {/* Card */}
      <Card className="mb-3 ">
        <Card.Header className="border-bottom px-4 py-3">
          <h4 className="mb-0">프로그램 기본 정보</h4>
        </Card.Header>
        {/* Card body */}
        <Card.Body>
          {/* <Form> */}
          <Row>
            {/* Project's Name */}
            <Col xs={12} className="mb-4">
              <Form.Group controlId="program_title">
                <Form.Label>
                  프로그램 제목 <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="프로그램 제목을 입력하세요." name="program_title" onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">제목을 입력해주세요.</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Description */}
            <Col xs={12} className="mb-4">
              <Form.Group controlId="program_description">
                <Form.Label>
                  프로그램 설명 <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control as="textarea" rows={10} name="program_description" onChange={handleChange} placeholder="프로그램에 관한 정보를 입력하세요." required />
                <Form.Control.Feedback type="invalid">프로그램 설명을 입력해주세요.</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* file */}
            <Col xs={12} className="mb-4">
              <Form.Group controlId="program_description">
                <Form.Label>첨부 파일</Form.Label>
                {/* <form className="upload_input">
                  <input type="file" id="file" onChange={onLoadFile} />
                </form> */}
                <Form className="upload_input">
                  <Input id="file" name="file" type="file" onChange={onLoadFile} />
                </Form>
              </Form.Group>
            </Col>

            {/* Start Date */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Group controlId="start_date">
                <Form.Label>
                  프로그램 시작 날짜 <span className="text-danger">*</span>
                </Form.Label>

                <InputGroup className="datePicker-wrapper">
                  <DatePicker
                    required
                    locale={ko}
                    dateFormat="yyyy-MM-dd HH:mm"
                    className="datePicker form-control"
                    placeholderText="시작 날짜를 선택해주세요."
                    selected={startDate}
                    minDate={today}
                    maxDate={endDate}
                    onChange={(date) => {
                      setStartDate(date);
                      props.setStart_date(date);
                    }}
                    showTimeSelect
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* End Date */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Label>
                프로그램 종료 날짜 <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup required>
                <DatePicker
                  required
                  locale={ko}
                  dateFormat="yyyy-MM-dd HH:mm"
                  className="datePicker form-control"
                  placeholderText="종료 날짜를 선택해주세요."
                  selected={endDate}
                  minDate={startDate}
                  onChange={(date) => {
                    if (startDate === undefined) {
                      alert("프로그램 시작날짜를 먼저 선택하세요.");
                    } else {
                      setEndDate(date);
                      props.setEnd_date(date);
                    }
                  }}
                  showTimeSelect
                />
              </InputGroup>
            </Col>

            <Col md={6} xs={12} className="mb-4">
              <Form.Group controlId="Applystart_date">
                <Form.Label>
                  신청 시작 날짜 <span className="text-danger">*</span>
                </Form.Label>

                <InputGroup className="datePicker-wrapper">
                  <DatePicker
                    required
                    locale={ko}
                    dateFormat="yyyy-MM-dd HH:mm"
                    className="datePicker form-control"
                    placeholderText="시작 날짜를 선택해주세요."
                    selected={ApplystartDate}
                    minDate={today}
                    maxDate={startDate}
                    onChange={(date) => {
                      setApplyStartDate(date);
                      props.setApplyStart_date(date);
                    }}
                    showTimeSelect
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* End Date */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Label>
                신청 마감 날짜 <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup required>
                <DatePicker
                  required
                  locale={ko}
                  dateFormat="yyyy-MM-dd HH:mm"
                  className="datePicker form-control"
                  placeholderText="종료 날짜를 선택해주세요."
                  selected={ApplyendDate}
                  minDate={ApplystartDate}
                  maxDate={startDate}
                  onChange={(date) => {
                    if (ApplystartDate === undefined) {
                      alert("신청 시작 날짜를 먼저 선택하세요.");
                    } else {
                      setApplyEndDate(date);
                      props.setApplyEnd_date(date);
                    }
                  }}
                  showTimeSelect
                />
              </InputGroup>
            </Col>

            {/* 프로그램 정원 */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Group>
                <Form.Label>프로그램 정원 (입력 값이 없다면 정원은 무제한이 됩니다.)</Form.Label>
                <Form.Control type="number" placeholder="" id="program_quota" name="program_quota" onChange={handleChange} />
              </Form.Group>
            </Col>

            {/* 카테고리 */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Group controlId="program_category">
                <Form.Label>
                  카테고리 <span className="text-danger">*</span>
                </Form.Label>
                <select class="form-select" id="program_category" name="program_category" onChange={handleChange} required>
                  <option selected value="">
                    카테고리를 선택해주세요.
                  </option>
                  <option value="1">대회</option>
                  <option value="2">봉사</option>
                  <option value="3">캠프</option>
                  <option value="4">행사</option>
                  <option value="5">맥북</option>
                  <option value="6">프로젝트/스터디</option>
                  <option value="7">인턴/현장실습</option>
                  <option value="8">특강</option>
                  <option value="9">기타</option>
                </select>
                <Form.Control.Feedback type="invalid">카테고리를 선택해주세요.</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* 문의 */}
            <Col md={6} xs={12} className="mb-4">
              <Form.Group controlId="manager_name">
                <Form.Label>담당자</Form.Label>
                <Form.Control type="text" placeholder="담당자 이름을 입력하세요." name="manager_name" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6} xs={12} className="mb-4">
              <Form.Group controlId="manager_contact">
                <Form.Label>담당자 연락처</Form.Label>
                <Form.Control type="text" placeholder="담당자 연락처를 입력하세요." name="manager_contact" onChange={handleChange} />
              </Form.Group>
            </Col>

            {/* Project Cover Image */}
            <Col xs={5} className="mb-4">
              <h5 className="mb-3">프로그램 이미지(포스터) </h5>
              <div className="img_wrap dropzone p-2 border-dashed mb-3 d-flex justify-content-center">
                {preview ? <img src={preview} alt="" width="100%" /> : <img src={PreviewDefault} alt="" width="100%" />}
              </div>
              {/* <form className="upload_input">
                <input type="file" id="image" accept="image/jpeg, image/png" onChange={onLoadPoster} />
              </form> */}

              <Form className="upload_input">
                <Input id="image" name="file" accept="image/jpeg, image/png, image/jpg" type="file" onChange={onLoadPoster} />
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* Button */}
      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          다음
        </Button>
      </div>
    </Form>
  );
};

export default BasicInformation;
