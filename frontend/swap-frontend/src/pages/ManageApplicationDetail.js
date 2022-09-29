// import node module libraries
import { Fragment } from "react";
import { Row, Col, Card, Tab, Breadcrumb, Nav, ListGroup, Table } from "react-bootstrap";
import React, { useState, useLayoutEffect } from "react";
import { useParams, Link } from "react-router-dom";
import $ from "jquery";

// import sub components
import axios from "axios";
// import sub components
import NavbarVertical from "layouts/dashboard/NavbarVertical";
import NavbarTop from "layouts/dashboard/NavbarTop";

window.jQuery = $;
window.$ = $;
require("formBuilder/dist/form-render.min.js");

const ManageApplicationDetail = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [applicationName, setApplicationName] = useState();
  const [programName, setProgramName] = useState();

  var applicationLoading = false;
  // var programNameLoading = false;
  var formData = "";
  const [formDataLoading, setFormDataLoading] = useState(false);
  const [programNameLoading, setProgramNameLoading] = useState(false);

  var formRenderInstance = "";
  var json_total = "";
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  const id = useParams();

  useLayoutEffect(() => {
    readApplication();
    componentDidMount();
    // readProgramName();
  }, []);

  const readApplication = async () => {
    applicationLoading = false;
    var params = new URLSearchParams();
    if (id["id"] != null) {
      params.append("id", id["id"]);
      const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "application/readApplicationById", params);
      setApplicationName(response.data[0].name);
      json_total = response.data[0].content;
      formData = response.data[0].content;

      applicationLoading = true;
      if (applicationLoading && formData !== "") {
        componentDidMount();
        readProgramName();
      }
    }
  };

  const componentDidMount = () => {
    const fbRender = document.getElementById("fb-editor");
    formRenderInstance = $(fbRender).formRender({ formData });
    setFormDataLoading(true);
  };

  const readProgramName = async () => {
    // programNameLoading = false;
    setProgramNameLoading(false);

    if (applicationLoading) {
      var params = new URLSearchParams();
      if (id["id"] != null) {
        params.append("id", id["id"]);
        const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "application/readProgramName", params);

        setProgramName(response.data);

        setProgramNameLoading(true);
      }
    }
  };

  return (
    <Fragment>
      <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
        <div className="navbar-vertical navbar">
          <NavbarVertical showMenu={showMenu} onClick={(value) => setShowMenu(value)} />
        </div>
        <div id="page-content">
          <div className="header">
            <NavbarTop
              data={{
                showMenu: showMenu,
                SidebarToggleMenu: ToggleMenu,
              }}
            />
          </div>
          <div className="container-fluid p-4">
            <Tab.Container defaultActiveKey="grid">
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
                    <div className="mb-3 mb-md-0">{formDataLoading ? <h1 className="mb-1 h2 fw-bold">{applicationName}</h1> : ""}</div>
                    <div>
                      <Link to="/swap/admin/application" className="btn btn-success ">
                        신청서 목록 보기
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Tab.Container defaultActiveKey="application">
                    <Card>
                      <Card.Header className="border-bottom-0 p-0 bg-white">
                        <Nav className="nav-lb-tab">
                          <Nav.Item>
                            <Nav.Link eventKey="application" className="mb-sm-3 mb-md-0">
                              신청서
                            </Nav.Link>
                          </Nav.Item>
                          {/* <Nav.Item>
                            <Nav.Link eventKey="program" className="mb-sm-3 mb-md-0">
                              사용중인 프로그램
                            </Nav.Link>
                          </Nav.Item> */}
                        </Nav>
                      </Card.Header>
                      <Card.Body className="p-5">
                        <Tab.Content>
                          <Tab.Pane eventKey="application" className="pb-4">
                            {formDataLoading ? (
                              <div>
                                <form id="fb-editor"></form>
                              </div>
                            ) : (
                              ""
                            )}
                          </Tab.Pane>
                          {/* <Tab.Pane eventKey="program" className="pb-4">
                            {programNameLoading ? (
                              <div className="table-responsive ">
                                <Table className="text-nowrap">
                                  <tbody>
                                    {programName.map((subitem, subindex) => (
                                      <tr>
                                        <td>{subitem}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </div>
                            ) : (
                              ""
                            )}
                          </Tab.Pane> */}
                        </Tab.Content>
                      </Card.Body>
                    </Card>
                  </Tab.Container>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ManageApplicationDetail;
