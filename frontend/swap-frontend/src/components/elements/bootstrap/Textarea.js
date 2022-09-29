import React, { useContext, useRef } from "react";
// import { FormContext } from "../../FormContext";
import { Form, Col } from "react-bootstrap";
import { Dropdown, Image, OverlayTrigger, Tooltip, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { MoreVertical, Trash, Edit, Mail } from "react-feather";
const Textarea = ({ id, label, placeholder, value, input, width, create }) => {
  //   const { handleChange } = useContext(FormContext);
  var setwidth = "";
  switch (width) {
    case "one":
      setwidth = "col-md-1";
      break;
    case "quarter":
      setwidth = "col-md-4";
      break;
    case "half":
      setwidth = "col-md-6";
      break;
    case "full":
      setwidth = "col-md-12";
      break;
    default:
      setwidth = width;
  }

  return (
    <Col md={12} sm={12} className="mb-4">
      {create === "1" ? (
        <Form.Group controlId={id}>
          {/* <Form.Label>{label}</Form.Label> */}
          <Row>
            <Col sm="">
              <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}>
                <Link to="#">
                  <Trash size="15px" className="dropdown-item-icon mt-3" />
                </Link>
              </OverlayTrigger>
            </Col>
            <Col sm="11">
              {" "}
              <Form.Control type="text" placeholder={placeholder} required className="form-control-plaintext " defaultValue={label} />
            </Col>
          </Row>
          <Row>
            <Col sm="1"> </Col>
            <Col sm="11">
              <Form.Control as="textarea" placeholder={placeholder} required />
            </Col>
          </Row>
        </Form.Group>
      ) : (
        <Form.Group controlId={id}>
          {/* <Form.Label>{label}</Form.Label> */}
          <Form.Control type="text" placeholder={placeholder} required className="form-control-plaintext " defaultValue={label} />
          <Form.Control as="textarea" placeholder={placeholder} required />
        </Form.Group>
      )}
    </Col>
  );
};

export default Textarea;
